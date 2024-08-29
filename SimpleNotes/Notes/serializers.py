from rest_framework import serializers
from .models.note import Note
from .models.group import Group
from SimpleNotes.settings import GROUP_NAME_MAX_LENGTH, NOTE_NAME_MAX_LENGTH, NOTE_MAX_LENGTH


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['pk', 'name', 'group', 'content', 'created_time', 'updated_time']
    pk = serializers.IntegerField(required=False)
    content = serializers.CharField(required=False, default=None, max_length=NOTE_MAX_LENGTH)
    name = serializers.CharField(required=False,  allow_blank=True, max_length=NOTE_NAME_MAX_LENGTH)
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), required=False, default=None, allow_null=True)
    #group = serializers.IntegerField(required=False, default=None)
    created_time = serializers.DateTimeField(required=False)
    updated_time = serializers.DateTimeField(required=False)


class GroupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=GROUP_NAME_MAX_LENGTH)
