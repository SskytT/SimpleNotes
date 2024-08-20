from django.db import models
from SimpleNotes.settings import PASSWORD_MAX_LENGTH
from SimpleNotes.settings import NICKNAME_MAX_LENGTH
from ..utils import create_hash_password, check_password
from .email_verification import EmailVerification


class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=PASSWORD_MAX_LENGTH)
    nickname = models.CharField(max_length=NICKNAME_MAX_LENGTH)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    @staticmethod
    def create(email, password, nickname):
        hash_pass = create_hash_password(password)
        user = User.objects.create(email=email, password=hash_pass, nickname=nickname)
        return user

    @staticmethod
    def registration(email, password, nickname):
        ev = EmailVerification.create(email=email, password=password, nickname=nickname)
        if ev is None:
            return None
        else:
            ev.send_ver_mail()
        return ev.url

    @staticmethod
    def verification(code, url):
        ev = EmailVerification.check_code(code=code, url=url)
        if ev is None:
            return None
        else:
            user = User.create(email=ev.email, password=ev.password, nickname=ev.nickname)
            ev.delete()
            return user

    @staticmethod
    def get_user(email, password):
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            if check_password(password, user.password):
                return user
        return None

