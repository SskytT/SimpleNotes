import bcrypt
from django.utils import timezone
from django.utils.crypto import get_random_string
from SimpleNotes.settings import VERIFICATION_CODE_LIFE_TIME
from SimpleNotes.settings import API_KEY_LIFE_TIME


def create_hash_password(password):
    salt = bcrypt.gensalt()
    hash_password_str = bcrypt.hashpw(bytes(password, encoding='utf-8'), salt).decode('utf-8')
    return hash_password_str


def get_verification_code_expiration_date():
    return timezone.now() + VERIFICATION_CODE_LIFE_TIME


def get_api_key_expiration_date():
    return timezone.now() + API_KEY_LIFE_TIME



def get_created_date():
    return timezone.now()


def check_password(password, user_pass):
    return bcrypt.checkpw(bytes(password, encoding='utf-8'), bytes(user_pass, encoding='utf-8'))


class AnonUser:
    def __init__(self, is_auth):
        self.is_auth = is_auth



