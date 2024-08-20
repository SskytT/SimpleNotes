from django.db import models
from .user import User
from SimpleNotes.settings import API_KEY_MAX_LENGTH, API_KEY_LIFE_TIME, API_KEY_ALLOWED_CHARS
from ..utils import get_expiration_date
from django.utils.crypto import get_random_string
from django.utils import timezone


class APIKey(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    key = models.CharField(max_length=API_KEY_MAX_LENGTH, unique=True)
    expired_time = models.DateTimeField(default=get_expiration_date(API_KEY_LIFE_TIME))

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = "API ключ"
        verbose_name_plural = "API ключи"

    @staticmethod
    def get(user):
        if APIKey.objects.filter(user=user).exists():
            ak = APIKey.objects.get(user=user)
            if ak.expired_time > timezone.now():
                return ak
            ak.delete()
            new_ak = APIKey.create(user)
            return new_ak
        ak = APIKey.create(user)
        return ak

    @staticmethod
    def create(user):
        if User.objects.filter(pk=user.pk).exists():
            while True:
                key = get_random_string(API_KEY_MAX_LENGTH, allowed_chars=API_KEY_ALLOWED_CHARS)
                if not APIKey.objects.filter(key=key).exists():
                    et = get_expiration_date(API_KEY_LIFE_TIME)
                    ak = APIKey.objects.create(user=user, key=key, expired_time=et)
                    return ak
        return None

    @staticmethod
    def check_token(token):
        if APIKey.objects.filter(key=token).exists():
            ak = APIKey.objects.get(key=token)
            if ak.expired_time > timezone.now():
                return ak
        return None




