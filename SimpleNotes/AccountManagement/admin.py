from django.contrib import admin
from .models.user import User
from .models.email_verification import EmailVerification
from .models.apikey import APIKey


admin.site.register(User)
admin.site.register(EmailVerification)
admin.site.register(APIKey)
