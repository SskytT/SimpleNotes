# Generated by Django 5.1 on 2024-08-20 20:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AccountManagement', '0008_alter_emailverification_expired_time_apikey'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apikey',
            name='expired_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 20, 20, 6, 56, 157975, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='emailverification',
            name='expired_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 20, 20, 9, 56, 154976, tzinfo=datetime.timezone.utc)),
        ),
    ]
