from rest_framework import serializers
from .models import Photo, Comment, Like
from users.models import User

class FeedUserSerializer(serializers.ModelSerializer):
    is_self = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = (
            'profile_image',
            'username',
            'name',
            'post_count',
            'followers_count',
            'following_count',
            'is_self',
        )

    def get_is_self(self, user):
        if 'request' in self.context:
            request = self.context['request']
            if user.id == request.user.id:
                return True
            else:
                return False
        return False

class CommentSerializer(serializers.ModelSerializer):
    owner = FeedUserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = (
            'id',
            'message',
            'owner'
        )

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'
        
class PhotoSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    is_liked = serializers.SerializerMethodField()
    owner = FeedUserSerializer(read_only=True)

    class Meta:
        model = Photo
        fields = (
                'id', 
                'image', 
                'caption', 
                'owner', 
                'comments', 
                'comment_count', 
                'is_liked',
                'like_count',
                )

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                Like.objects.get(
                    owner__id=request.user.id,
                    photo__id=obj.id
                )
                return True
            except Like.DoesNotExist:
                return False
        return False