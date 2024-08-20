from django.urls import path
from .views.registration import RegistrationAPIView

urlpatterns = [
    path('registration', RegistrationAPIView.as_view(), name="registration"),
    path('registration/<str:url>/', RegistrationAPIView.as_view(), name="verification")
]