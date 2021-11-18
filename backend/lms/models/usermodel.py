from django.db import models
from django.contrib.auth.models import AbstractUser
from ..manager import UserManager
from rest_framework_simplejwt.tokens import RefreshToken
from multiselectfield import MultiSelectField

# Create your models here.
class User(AbstractUser):
    role_choices=[
        ('student','Student'),
        ('teacher','Teacher'),
        ('admin','Admin')
    ]

    Grade_Choices = [
       (1,'One'),
       (2,'Two'),
       (3,'Three'),
       (4,'Four'),
       (5,'Five'),
       (6,'Six'),
       (7,'Seven'),
       (8,'Eight'),
       (9,'Nine'),
       (10,'Ten')
   ]
    username = None
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=10)
    role = models.CharField(choices=role_choices,max_length=200)
    student_class = models.IntegerField(choices=Grade_Choices,null=True) 
    teacher_class = MultiSelectField(choices=Grade_Choices,max_length=10,null=True)
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
    def __str__(self):
        return f'{self.email}'