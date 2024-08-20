from django.urls import path
from .views.registration import RegistrationAPIView
from .views.login import LoginAPIView

urlpatterns = [
    path('registration', RegistrationAPIView.as_view(), name="registration"),
    path('registration/<str:url>/', RegistrationAPIView.as_view(), name="verification"),
    path('login', LoginAPIView.as_view(), name="login")
]