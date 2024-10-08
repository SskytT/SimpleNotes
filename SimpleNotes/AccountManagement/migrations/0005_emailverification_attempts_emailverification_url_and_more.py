# Generated by Django 5.1 on 2024-08-20 01:25

import AccountManagement.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AccountManagement', '0004_alter_emailverification_expired_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailverification',
            name='attempts',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='emailverification',
            name='url',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='emailverification',
            name='code',
            field=models.CharField(max_length=6),
        ),
        migrations.AlterField(
            model_name='emailverification',
            name='created_time',
            field=models.DateTimeField(default=AccountManagement.utils.get_created_date),
        ),
    ]
