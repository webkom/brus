# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-05-03 09:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("liste", "0001_initial")]

    operations = [
        migrations.AlterField(
            model_name="person",
            name="name",
            field=models.CharField(max_length=50, unique=True),
        )
    ]
