# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-07 04:23
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0004_like'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='owner',
        ),
    ]