# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from users.models import User
from .pagination import MyPageImagePagination
from rest_framework.pagination import LimitOffsetPagination
import math
# Create your views here.

class PhotosByUsername(APIView):
    def get(self, request, username, format=None):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        page = int(request.query_params.get('page', 1))
        page_size = 9
        
        photos = models.Photo.objects.filter(owner=user)

        last_page = math.ceil(float(photos.count()) / page_size)

        headers = {'Is_Last': False}
        if page == last_page:
            headers['Is_Last'] = True

        photo_list = []

        for index, photo in enumerate(photos):
            if index in range(page_size * (page - 1), page_size * (page)):
                photo_list.append(photo)

        sorted_list = sorted(photo_list, key=lambda photo: photo.created, reverse=True)

        serializer = serializers.PhotoSerializer(
            sorted_list,
            many=True,
            context={'request': request}
        )
    
        return Response(data=serializer.data, headers=headers, status=status.HTTP_200_OK)


class Photos(APIView):
    def get(self, request, *args, **kwargs):
        page = int(request.GET.get('page', 1))


        user = request.user
        page_size = 9
        # print(page * page_size)
        last_page = math.ceil(float(user.photos.all().count()) / page_size)
        # print(last_page)
        # print(user.photos.all())

        # if page > last_page:
        #     return Response([])

        headers = {'Is_Last': False}
        if page == last_page:
            headers['Is_Last'] = True

        photo_list = []

        for index, photo in enumerate(user.photos.all()):
            if index in range(page_size * (page - 1), page_size * (page)):
                photo_list.append(photo)

        sorted_list = sorted(photo_list, key=lambda photo: photo.created, reverse=True)

        serializer = serializers.PhotoSerializer(
            sorted_list,
            many=True,
            context={'request': request}
        )

        return Response(serializer.data, headers=headers)

    def post(self, request, *args, **kwargs):
        user = request.user

        serializer = serializers.PhotoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=user)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhotoDetail(APIView):
    def find_own_image(self, image_id, user):
        try:
            image = models.Photo.objects.get(id=image_id, owner=user)
            return image
        except models.Photo.DoesNotExist:
            return None

    def get(self, request, image_id, format=None):
        user = request.user

        try:
            image = models.Photo.objects.get(id=image_id)
        except models.Photo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.PhotoSerializer(
            image,
            context={'request': request}
        )

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, image_id, format=None):
        user = request.user

        image = self.find_own_image(image_id, user)

        if image is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if image.image is not None:
            image.image.delete()

        serializer = serializers.PhotoSerializer(
            image,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save(owner=user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, image_id, format=None):
        user = request.user

        image = self.find_own_image(image_id, user)
        print(image)
        if image is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if image.image is not None:
            image.image.delete()
        image.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentOnPhoto(APIView):
    def post(self, request, image_id, format=None):
        user = request.user

        try:
            found_image = models.Photo.objects.get(id=image_id)
        except models.Photo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.CommentSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save(owner=user, photo=found_image)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class Comment(APIView):
    def delete(self, request, comment_id, format=None):
        user = request.user
        try:
            comment = models.Comment.objects.get(id=comment_id, owner=user)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LikeImage(APIView):
    def get(self, request, image_id, format=None):
        likes = models.Like.objects.filter(photo__id=image_id)
        like_owner_ids = likes.values('owner_id')
        user = User.objects.filter(id__in=like_owner_ids)
        serializer = serializers.LikeSerializer(
            users,
            many=True,
            context={'request': request}
        )

        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, image_id, format=None):
        user = request.user
        try:
            found_image = models.Photo.objects.get(id=image_id)
        except models.Photo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            pre_existing_like = models.Like.objects.get(
                owner=user,
                photo=found_image
            )
            return Response(status=status.HTTP_304_NOT_MODIFIED)
        except models.Like.DoesNotExist:
            new_like = models.Like.objects.create(
                owner=user,
                photo=found_image
            )
            new_like.save()
            return Response(status=status.HTTP_201_CREATED)

class UnlikeImage(APIView):
    def delete(self, request, image_id, format=None):
        user = request.user
        try:
            pre_existing_like = models.Like.objects.get(
                owner=user,
                photo__id=image_id
            )
            pre_existing_like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Like.DoesNotExist:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
