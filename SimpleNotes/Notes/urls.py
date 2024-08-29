from django.urls import path
from .views.note_group import NoteAPIView, OneNoteAPIView, GroupAPIView, OneGroupAPIView

urlpatterns = [
    path('note', NoteAPIView.as_view(), name='note_create'),
    path('note/<int:note_id>/', OneNoteAPIView.as_view(), name='note_get'),
    path('group', GroupAPIView.as_view(), name='group_create'),
    path('group/<int:group_id>/', OneGroupAPIView.as_view(), name='group_get'),
]
