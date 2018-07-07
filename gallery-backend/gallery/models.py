# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from users.models import User

# Create your models here.

class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class Photo(models.Model):
    owner = models.ForeignKey(
        User,
        null = True,
        related_name='photos'
    )
    image = models.ImageField(upload_to='photos/%Y/%m/%d', null=True, default='photos/no_image.png')
    caption = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}-{}'.format(self.owner, self.created)

    class Meta:
        ordering = ['-updated', ]

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def like_count(self):
        return self.likes.all().count()

class Comment(TimeStampedModel):
    message = models.TextField()
    owner = models.ForeignKey(User, null=True)
    photo = models.ForeignKey(Photo, null=True, related_name='comments')

    def __str__(self):
        return self.message

class Like(TimeStampedModel):
    owner = models.ForeignKey(User, null=True)
    photo = models.ForeignKey(Photo, null=True, related_name='likes')

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.owner.username, self.photo.caption)