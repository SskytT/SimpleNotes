from django.urls import path
from .views.registration import RegistrationAPIView, RememberPasswordAPIView
from .views.login import LoginAPIView

urlpatterns = [
    path('registration', RegistrationAPIView.as_view(), name="registration"),
    path('registration/<str:url>/', RegistrationAPIView.as_view(), name="verification"),
    path('login', LoginAPIView.as_view(), name="login"),
    path('changepass', RememberPasswordAPIView.as_view(), name='change_pass'),
    path('changepass/<str:url>/', RememberPasswordAPIView.as_view(), name='change_pass_ver'),
]