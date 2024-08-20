from django.shortcuts import render
from ..models.user import User
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import RegistrationSerializer, VerificationSerializer

class RegistrationAPIView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not User.objects.filter(email=serializer.validated_data.get('email')).exists():
            url = User.registration(email=serializer.validated_data.get('email'),
                                    password=serializer.validated_data.get('password'),
                                    nickname=serializer.validated_data.get('nickname'))
            return Response({"url": url})
        return Response({"error": "this email already exists"})

    def get(self, request, *args, **kwargs):
        url = kwargs.get("url", None)
        if url is None:
            return Response({"answer": "verification failed"})
        serializer = VerificationSerializer(data=request.GET)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data.get('code')
        user = User.verification(code=code, url=url)
        print(code)
        if user is None:
            return Response({"answer": "verification failed"})
        else:
            return Response({"answer": "verification was successful"})






