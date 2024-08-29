from django.db import models
from SimpleNotes.settings import NOTE_NAME_MAX_LENGTH
from .group import Group
from ..utils import get_created_date
from AccountManagement.models.user import User


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=NOTE_NAME_MAX_LENGTH, blank=True, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, blank=True, null=True,
                              related_name='notes', default=None)
    content = models.TextField()
    created_time = models.DateTimeField(default=get_created_date)
    updated_time = models.DateTimeField(default=get_created_date)

    def __str__(self):
        if self.name is None:
            return "Без названия " + self.user.email
        return self.name + " " + self.user.email

    class Meta:
        verbose_name = "Заметка"
        verbose_name_plural = "Заметки"

    @staticmethod
    def create(user, name, group, content):
        if group is None:
            note = Note.objects.create(user=user, name=name, group=group, content=content)
            return note
        elif Group.objects.filter(pk=group.pk).exists():
            if Group.objects.get(pk=group.pk).user != user:
                return None
            note = Note.objects.create(user=user, name=name, group=group, content=content)
            return note
        return None

    @staticmethod
    def get(user, note):
        if Note.objects.filter(pk=note).exists():
            nt = Note.objects.get(pk=note)
            if nt.user == user:
                return nt
        return None

    def update(self, name, group, content, user, not_null_name, not_null_group, not_null_content):
        if not_null_name:
            self.name = name
        if not_null_group:
            if group is None:
                self.group = group
            else:
                if group.user == user:
                    self.group = group
                else:
                    return False
        if not_null_content:
            self.content = content
        self.save()
        return True


