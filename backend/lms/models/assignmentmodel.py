from django.db import models
from .usermodel import *

class AssignmentCreate(models.Model):
    teacher_create = models.ForeignKey(Teacher,on_delete=models.CASCADE)
    title = models.CharField(max_length=220)
    assignment_pdf_create = models.FileField(upload_to='assignment_create')
    created_data = models.DateTimeField(auto_now=True)
    deadline = models.DateTimeField()

class AssignmentSubmit(models.Model):
    student_submit = models.ForeignKey(Student,on_delete=models.CASCADE)
    assignment_pdf_submit = models.FileField(upload_to='assignment_submit')
    submited_data = models.DateTimeField(auto_now=True)
