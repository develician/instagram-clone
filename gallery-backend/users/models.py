# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    profile_image = models.ImageField(upload_to='photos/profiles', null=True, default='photos/profiles/no_image.png')
    name = models.CharField(blank=True, max_length=255)
    followers = models.ManyToManyField("self", blank=True, related_name='followers_user', symmetrical=False)
    following = models.ManyToManyField("self", blank=True, related_name='following_user', symmetrical=False)

    def __str__(self):
        return self.username

    @property
    def post_count(self):
        return self.photos.all().count()
    
    @property
    def followers_count(self):
        return self.followers.all().count()
    
    @property
    def following_count(self):
        return self.following.all().count()
