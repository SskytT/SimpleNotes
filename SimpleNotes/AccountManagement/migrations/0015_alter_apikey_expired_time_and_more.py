# Generated by Django 5.1 on 2024-08-24 22:35

import AccountManagement.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AccountManagement', '0014_alter_apikey_expired_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apikey',
            name='expired_time',
            field=models.DateTimeField(default=AccountManagement.utils.get_api_key_expiration_date),
        ),
        migrations.AlterField(
            model_name='emailverification',
            name='expired_time',
            field=models.DateTimeField(default=AccountManagement.utils.get_verification_code_expiration_date),
        ),
    ]
