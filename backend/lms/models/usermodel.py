from django.db import models
from django.contrib.auth.models import AbstractUser
from ..manager import UserManager
from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.
class User(AbstractUser):
    role_choices=[
        ('student','Student'),
        ('teacher','Teacher'),
        ('admin','Admin')
    ]
    username = None
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=10)
    role = models.CharField(choices=role_choices,max_length=200)
    last_login = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return{
            'access':str(refresh .access_token),
            'refresh':str(refresh )
        }
