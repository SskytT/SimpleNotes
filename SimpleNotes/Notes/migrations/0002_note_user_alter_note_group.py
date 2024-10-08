# Generated by Django 5.1 on 2024-08-21 13:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AccountManagement', '0012_alter_apikey_expired_time_and_more'),
        ('Notes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='user',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='AccountManagement.user'),
        ),
        migrations.AlterField(
            model_name='note',
            name='group',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='Notes.group'),
        ),
    ]
