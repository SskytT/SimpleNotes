from django.db import models
from SimpleNotes.settings import PASSWORD_MAX_LENGTH
from SimpleNotes.settings import NICKNAME_MAX_LENGTH


class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=PASSWORD_MAX_LENGTH)
    nickname = models.CharField(max_length=NICKNAME_MAX_LENGTH)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

