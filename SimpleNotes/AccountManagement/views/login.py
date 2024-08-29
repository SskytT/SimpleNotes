from ..models.user import User
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import LoginSerializer
from ..models.apikey import APIKey


class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.get_user(email=serializer.validated_data.get('email'),
                             password=serializer.validated_data.get('password'))
        if user is None:
            return Response({"answer": "incorrect password/email pair"})
        ak = APIKey.get(user)
        if ak is None:
            return Response({"answer": "no key"})
        return Response({"answer": "login", "key": ak.key})

