from django.db import models
from .usermodel import *
from .subjectmodel import *

class AssignmentCreate(models.Model):
    teacher_create = models.ForeignKey(Teacher,on_delete=models.CASCADE)
    subject_create = models.ForeignKey(Subject,on_delete=models.CASCADE)
    title = models.CharField(max_length=220)
    assignment_pdf_create = models.FileField(upload_to='assignment_create')
    created_date = models.DateTimeField(auto_now=True)
    deadline = models.DateTimeField()

    def __str__(self):
        return f'{self.subject_create.subject_name} - {self.title}'

class AssignmentSubmit(models.Model):
    assignment = models.OneToOneField(AssignmentCreate,on_delete=models.CASCADE)
    student_submit = models.ForeignKey(Student,on_delete=models.CASCADE)
    assignment_pdf_submit = models.FileField(upload_to='assignment_submit')
    submited_date = models.DateTimeField(auto_now=True)

  
