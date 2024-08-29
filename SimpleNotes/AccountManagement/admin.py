from django.contrib import admin
from .models.user import User
from .models.email_verification import EmailVerification
from .models.apikey import APIKey


class UserAdmin(admin.ModelAdmin):
    list_display = ('pk', 'nickname', 'email')
    list_display_links = ('pk', 'email', 'nickname')
    readonly_fields = ('pk',)


admin.site.register(User, UserAdmin)
admin.site.register(EmailVerification)
admin.site.register(APIKey)
