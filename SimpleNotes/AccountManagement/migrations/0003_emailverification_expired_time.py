# Generated by Django 5.1 on 2024-08-20 00:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AccountManagement', '0002_emailverification'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailverification',
            name='expired_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 20, 0, 36, 51, 354124, tzinfo=datetime.timezone.utc)),
        ),
    ]
