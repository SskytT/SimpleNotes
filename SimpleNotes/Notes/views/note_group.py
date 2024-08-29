from rest_framework.views import APIView
from ..serializers import NoteSerializer, GroupSerializer
from ..models.note import Note, Group
from rest_framework.response import Response


class NoteAPIView(APIView):
    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        note = Note.create(user=request.custom_user, name=serializer.validated_data['name'],
                           group=serializer.validated_data['group'],
                           content=serializer.validated_data['content'])
        if note is None:
            return Response({"answer": "group not found"})
        return Response({"answer": "note successfully created"})

    def get(self, request):
        notes = Note.objects.filter(user=request.custom_user, group=None)
        groups = Group.objects.filter(user=request.custom_user)
        notes_data = [{"id": note.pk, "name": note.name, "content": note.content[:200]} for note in notes]
        groups_data = [{"id": group.pk, "name": group.name} for group in groups]
        return Response({"answer": "data received", "notes": notes_data, "groups": groups_data})


class OneNoteAPIView(APIView):
    def get(self, request, *args, **kwargs):
        note = kwargs.get('note_id', None)
        note = Note.get(user=request.custom_user, note=note)
        if note is None:
            return Response({"answer": "note not found"})
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        note = kwargs.get('note_id', None)
        note = Note.get(user=request.custom_user, note=note)
        if note is None:
            return Response({"answer": "note not found"})
        note.delete()
        return Response({"answer": "note deleted"})

    def put(self, request, *args, **kwargs):
        print(request.data)
        serializer = NoteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        note = kwargs.get('note_id', None)
        note = Note.get(user=request.custom_user, note=note)
        if note is None:
            return Response({"answer": "note not found"})
        res = note.update(name=serializer.validated_data.get('name'), group=serializer.validated_data.get('group'),
                          content=serializer.validated_data.get('content'), user=request.custom_user,
                          not_null_name=('name' in request.data),
                          not_null_group=('group' in request.data),
                          not_null_content=('content' in request.data)
                          )
        if res:
            return Response({"answer": "note updated"})
        return Response({"answer": "group not found"})


class GroupAPIView(APIView):
    def post(self, request):
        serializer = GroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        group = Group.objects.create(user=request.custom_user, name=serializer.validated_data['name'])
        if group is None:
            return Response({"answer": "error"})
        return Response({"answer": "group successfully created"})

    def get(self, request):
        groups = Group.objects.filter(user=request.custom_user)
        groups_data = [{"id": group.pk, "name": group.name} for group in groups]
        return Response(groups_data)


class OneGroupAPIView(APIView):
    def get(self, request, *args, **kwargs):
        group = kwargs.get('group_id', None)
        group = Group.get(user=request.custom_user, group=group)
        if group is None:
            return Response({"answer": "group not found"})
        notes = group.notes.all()
        notes_data = [{"id": note.pk, "name": note.name, "content": note.content[:200],
                       "created_time": note.created_time, "updated_time": note.updated_time}
                      for note in notes]
        return Response({"id": group.pk, "name": group.name, "data": notes_data})

    def delete(self, request, *args, **kwargs):
        group = kwargs.get('group_id', None)
        group = Group.get(user=request.custom_user, group=group)
        if group is None:
            return Response({"answer": "group not found"})
        group.delete()
        return Response({"answer": "group deleted"})

    def put(self, request, *args, **kwargs):
        serializer = GroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        group = kwargs.get('group_id', None)
        group = Group.get(user=request.custom_user, group=group)
        if group is None:
            return Response({"answer": "group not found"})
        res = group.update(name=serializer.validated_data.get('name'))
        if res:
            return Response({"answer": "group updated"})
        return Response({"answer": "group not found"})








