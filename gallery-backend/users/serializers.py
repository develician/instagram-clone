from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from gallery import serializers as photo_serializer
from .models import User

class SignUpSerializer(RegisterSerializer):
    name = serializers.CharField(required=True, write_only=True)

    def get_cleaned_data(self):
        return {
            'name': self.validated_data.get('name', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    photos = photo_serializer.PhotoSerializer(many=True, read_only=True)
    post_count = serializers.ReadOnlyField()
    is_self = serializers.SerializerMethodField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id',
            'profile_image',
            'username',
            'email',
            'name',
            'post_count',
            'photos',
            'is_self',
            'followers_count',
            'following_count',
            'following',
        )

    def get_is_self(self, user):
        if 'request' in self.context:
            request = self.context['request']
            if user.id == request.user.id:
                return True
            else:
                return False
        return False

    def get_following(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if obj in request.user.following.all():
                return True
        return False


class ListUserSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    is_self = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id',
            'profile_image',
            'username',
            'name',
            'post_count',
            'followers_count',
            'following_count',
            'following',
            'is_self',
        )
    
    def get_following(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if obj in request.user.following.all():
                return True
        return False

    def get_is_self(self, user):
        if 'request' in self.context:
            request = self.context['request']
            if user.id == request.user.id:
                return True
            else:
                return False
        return False
