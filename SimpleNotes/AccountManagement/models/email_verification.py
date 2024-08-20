from django.db import models
from SimpleNotes.settings import PASSWORD_MAX_LENGTH, NICKNAME_MAX_LENGTH, VERIFICATION_CODE_MAX_LENGTH
from SimpleNotes.settings import REPEAT_VER_MIN_TIME, VERIFICATION_CODE_LIFE_TIME, VERIFICATION_URL_MAX_LENGTH
from SimpleNotes.settings import COUNT_VERIFICATION_ATTEMPTS
from django.utils import timezone
from django.utils.crypto import get_random_string
from ..utils import get_expiration_date, get_created_date
from django.core.mail import send_mail


class EmailVerification(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=PASSWORD_MAX_LENGTH)
    nickname = models.CharField(max_length=NICKNAME_MAX_LENGTH)
    code = models.CharField(max_length=VERIFICATION_CODE_MAX_LENGTH)
    url = models.CharField(max_length=VERIFICATION_URL_MAX_LENGTH, unique=True)
    created_time = models.DateTimeField(default=get_created_date)
    expired_time = models.DateTimeField(default=get_expiration_date)
    attempts = models.IntegerField(default=0)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'Проверка почты'
        verbose_name_plural = 'Проверки почты'

    @staticmethod
    def create(email, password, nickname):
        if EmailVerification.objects.filter(email=email).exists():
            ev = EmailVerification.objects.get(email=email)
            if ev.created_time + REPEAT_VER_MIN_TIME > timezone.now():
                return None
            else:
                ev.delete()
        while True:
            url = get_random_string(VERIFICATION_URL_MAX_LENGTH, allowed_chars="0123456789")
            cod = get_random_string(VERIFICATION_CODE_MAX_LENGTH, allowed_chars="0123456789")
            if not EmailVerification.objects.filter(url=url).exists():
                ev = EmailVerification.objects.create(email=email, password=password,
                                                        nickname=nickname, code=cod,
                                                        url=url)
                return ev

    @staticmethod
    def check_code(url, code):
        print(url)
        if EmailVerification.objects.filter(url=url).exists():
            print("залупа")
            ev = EmailVerification.objects.get(url=url)
            if ev.attempts < 5:
                ev.attempts += 1
                ev.save()
                if ev.code == code:
                    if ev.expired_time > timezone.now():
                        return ev
        return None

    def send_ver_mail(self):
        send_mail(subject='Checking mail', message=self.code,
                  fail_silently=False, recipient_list=[self.email],
                  from_email=None)



