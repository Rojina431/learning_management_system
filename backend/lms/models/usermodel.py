from django.db import models
from django.contrib.auth.models import AbstractUser
from ..manager import UserManager
from rest_framework_simplejwt.tokens import RefreshToken
from multiselectfield import MultiSelectField

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
# Create your models here.
class User(AbstractUser):
    role_choices=[
        ('student','Student'),
        ('teacher','Teacher'),
        ('admin','Admin')
    ]

    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    mobile = models.CharField(max_length=10)
    role = models.CharField(choices=role_choices,max_length=200)
    # student_class = models.IntegerField(choices=Grade_Choices,null=True,blank=True) 
    # teacher_class = MultiSelectField(choices=Grade_Choices,max_length=10,null=True,blank=True)
    last_login = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    def refresh(self):
        refresh = RefreshToken.for_user(self)
       
        refresh = str(refresh)
        return refresh
    def access(self):
        refresh = RefreshToken.for_user(self)
       
        access = str(refresh.access_token)
        return access

    def __str__(self) -> str:
        return f'{self.email}-{self.role}'  

class Student(models.Model):
    student = models.OneToOneField(User,on_delete=models.CASCADE)
    student_class = models.IntegerField(choices=Grade_Choices)    
    roll_no = models.BigIntegerField()    

class Teacher(models.Model):
    teacher = models.OneToOneField(User,on_delete=models.CASCADE)
    teacher_class = MultiSelectField(choices=Grade_Choices,max_length=10)      