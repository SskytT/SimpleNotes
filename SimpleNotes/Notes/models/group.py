from django.db import models
from SimpleNotes.settings import GROUP_NAME_MAX_LENGTH
from AccountManagement.models.user import User


class Group(models.Model):
    name = models.CharField(max_length=GROUP_NAME_MAX_LENGTH)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + " " + self.user.email

    class Meta:
        verbose_name = "Группа"
        verbose_name_plural = "Группы"

    @staticmethod
    def get(user, group):
        if Group.objects.filter(pk=group).exists():
            g = Group.objects.get(pk=group)
            if g.user == user:
                return g
        return None

    def update(self, name):
        if not (name is None):
            self.name = name
        self.save()
        return True
