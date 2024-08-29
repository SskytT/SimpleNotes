from ..models.user import User
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import RegistrationSerializer, VerificationSerializer, RememberPasswordSerializer, VerificationRememberPasswordSerializer


class RegistrationAPIView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not User.objects.filter(email=serializer.validated_data.get('email')).exists():
            url = User.registration(email=serializer.validated_data.get('email'),
                                    password=serializer.validated_data.get('password'),
                                    nickname=serializer.validated_data.get('nickname'))
            if url is None:
                return Response({"answer": "wait for next request"})
            else:
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


class RememberPasswordAPIView(APIView):
    def post(self, request):
        serializer = RememberPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if User.objects.filter(email=serializer.validated_data.get('email')).exists():
            url = User.request_password_recovery(email=serializer.validated_data.get('email'),
                                                 password=serializer.validated_data.get('password'))
            if url is None:
                return Response({"answer": "wait for next request"})
            else:
                return Response({"url": url})
        return Response({"error": "there is no such account"})

    def get(self, request, *args, **kwargs):
        url = kwargs.get('url', None)
        if url is None:
            return Response({"answer": "verification failed"})
        serializer = VerificationRememberPasswordSerializer(data=request.GET)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data.get('code')
        user = User.password_recovery_verification(url=url, code=code)
        if user is None:
            return Response({"answer": "verification failed"})
        else:
            return Response({"answer": "password updated"})







