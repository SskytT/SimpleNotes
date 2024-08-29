from rest_framework import serializers
from SimpleNotes.settings import PASSWORD_MAX_LENGTH
from SimpleNotes.settings import NICKNAME_MAX_LENGTH, VERIFICATION_CODE_MAX_LENGTH


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=PASSWORD_MAX_LENGTH)
    nickname = serializers.CharField(max_length=NICKNAME_MAX_LENGTH)


class VerificationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=VERIFICATION_CODE_MAX_LENGTH)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=PASSWORD_MAX_LENGTH)


class RememberPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=PASSWORD_MAX_LENGTH)


class VerificationRememberPasswordSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=VERIFICATION_CODE_MAX_LENGTH)

