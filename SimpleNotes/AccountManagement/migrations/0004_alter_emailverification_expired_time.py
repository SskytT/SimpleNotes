# Generated by Django 5.1 on 2024-08-20 00:42

import AccountManagement.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AccountManagement', '0003_emailverification_expired_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emailverification',
            name='expired_time',
            field=models.DateTimeField(default=AccountManagement.utils.get_expiration_date),
        ),
    ]
