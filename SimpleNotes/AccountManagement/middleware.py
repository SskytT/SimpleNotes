from django.urls import reverse
import re
from .models.apikey import APIKey
from django.http import JsonResponse
from django.http import HttpResponsePermanentRedirect
from django.utils.deprecation import MiddlewareMixin
from .utils import AnonUser


class AuthMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
        self.exempt_urls = [
            reverse('registration'),
            reverse('login'),
            reverse('change_pass'),
        ]
        self.verification_pattern = re.compile(r'^/api/v1/registration/[^/]+/$')
        self.change_pass_verification_pattern = re.compile(r'^/api/v1/changepass/[^/]+/$')
        self.admin_pattern = re.compile(r'^/admin')

    def __call__(self, request):
        if request.path in self.exempt_urls or self.verification_pattern.match(request.path) or self.admin_pattern.match(request.path) or self.change_pass_verification_pattern.match(request.path):
            return self.get_response(request)

        if "authorization" in request.headers:
            header = request.headers['authorization']
            typ, tok = header.split(' ')
            if typ.lower() == "api-key":
                ak = APIKey.check_token(tok)
                if ak is None:
                    return JsonResponse({"answer": "token is invalid"})
                user = ak.user
                request.custom_user = user
                response = self.get_response(request)
                return response
        return JsonResponse({"answer": "authorization required"})




