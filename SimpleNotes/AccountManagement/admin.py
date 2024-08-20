from django.contrib import admin
from .models.user import User
from .models.email_verification import EmailVerification
# Register your models here.

admin.site.register(User)
admin.site.register(EmailVerification)
