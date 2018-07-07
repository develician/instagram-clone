# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = (
        'owner',
        'image',
        'caption',
        'created',
        'updated',
    )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'message',
        'owner',
        'photo'
    )