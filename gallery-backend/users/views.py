# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from . import models, serializers
from gallery.models import Photo
from gallery.serializers import PhotoSerializer, CommentSerializer
import math

# Create your views here.

class GetUserPhotoList(APIView):
    def get(self, request, username, format=None):
        found_user = models.User.objects.get(username=username)
        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND) 
        
        # print(found_user.post_list)
        serializer = serializers.UserPhotoListSerializer(
            found_user,
            many=True,
            context={'request': request}
        )
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class CheckLogged(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return Response(data=request.user.username, status=status.HTTP_200_OK)
        else:
            return Response(data=False, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileById(APIView):
    def get(self, request, user_id, format=None):
        found_user = models.User.objects.get(id=user_id)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND) 

        serializer = serializers.UserProfileSerializer(
            found_user,
            context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class ChangePassword(APIView):
    def put(self, request, username, format=None):
        try:
            found_user = models.User.objects.get(username=username)
        except:
            return None
        
        if not found_user.check_password(request.data['password']):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        if request.data['password1'] is not None:
            found_user.set_password(request.data['password1'])

            found_user.save()

            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        


class UserProfile(APIView):
    def get_user(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except:
            return None

    def get_profile_image(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user.profile_image
        except:
            return None

    def get(self, request, username, format=None):
        found_user = self.get_user(username)
        
        if found_user is None:

            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(
            found_user, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, username, format=None):
        user = request.user

        found_user = self.get_user(username)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        elif found_user.username != user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        else:
            # print(request.data)
            if request.data['profile_image'] is not None:
                profile_image = found_user.profile_image
                profile_image.delete()
            else:
                request.data['profile_image'] = self.get_profile_image(username)

            
            serializer = serializers.UserProfileSerializer(
                found_user, data=request.data, partial=True
            )

            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Search(APIView):
    def get(self, request, format=None):
        username = request.query_params.get('username', None)
        if username is not None:
            users = models.User.objects.filter(username__istartswith=username)
            serializer = serializers.ListUserSerializer(
                users,
                many=True,
                context={'request': request}
            )
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class FollowUser(APIView):
    def post(self, request, user_id, format=None):
        user = request.user
        print(user)
        try:
            user_to_follow = models.User.objects.get(id=user_id)
            print(user_to_follow)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.add(user_to_follow)
        user.save()

        user_to_follow.followers.add(user)
        user_to_follow.save()

        print(user.following)

        return Response(status=status.HTTP_200_OK)

class UnfollowUser(APIView):
    def post(self, request, user_id, format=None):
        user = request.user
        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.remove(user_to_follow)
        user.save()

        user_to_follow.followers.remove(user)
        user_to_follow.save()
        return Response(status=status.HTTP_200_OK)

class UserFollowers(APIView):
    def get(self, request, username, format=None):
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user_followers = found_user.followers.all()

        serializer = serializers.ListUserSerializer(
            user_followers,
            many=True,
            context={'request': request}
        )

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class UserFollowing(APIView):
    def get(self, request, username, format=None):
        try:
            found_user = models.User.objects.get(username=username)
        except model.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user_following = found_user.following.all()

        serializer = serializers.ListUserSerializer(
            user_following,
            many=True,
            context={'request': request}
        )

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class UserFollowingPosts(APIView):
    def get(self, request, username, format=None):

        page = int(request.query_params.get('page', 1))
        page_size = 9

        # print(page)

        try:
            found_user = models.User.objects.get(username=username)
        except model.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user_following = found_user.following.all()

        user_following_posts = []

        for index, following in enumerate(user_following):
            following_user_posts = Photo.objects.filter(owner=following) 
            for photo in following_user_posts:
                # print(comment_serializer.data)
                user_following_posts.append(photo)

    # print(user_following_posts)

        last_page = math.ceil(float(len(user_following_posts)) / page_size)

        headers = {'Is_Last': False}
        if page == last_page:
            headers['Is_Last'] = True

        paged_posts = []

        for index, photo in enumerate(user_following_posts):
            if index in range(page_size * (page - 1), page_size * (page)):
                paged_posts.append(photo)
        # print(len(paged_posts))

        sorted_list = sorted(paged_posts, key=lambda photo: photo.created, reverse=True)
        # print(sorted_list)
        serializer = PhotoSerializer(
            sorted_list,
            many=True,
            context={'request': request}
        )
        return Response(data=serializer.data, headers=headers, status=status.HTTP_200_OK)

class ExploreUsers(APIView):
    def get(self, request, format=None):
        last_five = models.User.objects.all().order_by('-date_joined')[:5]
        serializer = serializers.ListUserSerializer(
            last_five,
            many=True,
            context={'request': request}
        )

        return Response(data=serializer.data, status=status.HTTP_200_OK)