from django.db import models
from .usermodel import User


##Subject model
class Subject(models.Model):

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

    subject_name = models.CharField(max_length=200)
    subject_code = models.CharField(max_length=200,unique=True)
    grade = models.IntegerField(choices=Grade_Choices)
    subject_teacher = models.ForeignKey(User,models.SET_NULL,null=True,blank=True)

    def __str__(self):
        return f'{self.subject_name} - {"class: "+str(self.grade)}'
