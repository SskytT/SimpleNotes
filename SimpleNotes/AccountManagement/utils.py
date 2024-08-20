import bcrypt
from django.utils import timezone
from django.utils.crypto import get_random_string


def create_hash_password(password):
    salt = bcrypt.gensalt()
    hash_password_str = bcrypt.hashpw(bytes(password, encoding='utf-8'), salt).decode('utf-8')
    return hash_password_str


def get_expiration_date(life_time):
    return timezone.now() + life_time


def get_created_date():
    return timezone.now()


def check_password(password, user_pass):
    return bcrypt.checkpw(bytes(password, encoding='utf-8'), bytes(user_pass, encoding='utf-8'))



