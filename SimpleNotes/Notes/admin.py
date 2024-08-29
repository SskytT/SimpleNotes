from django.contrib import admin
from .models.note import Note
from .models.group import Group


class NoteAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)


class GroupAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)


admin.site.register(Note, NoteAdmin)
admin.site.register(Group, GroupAdmin)
