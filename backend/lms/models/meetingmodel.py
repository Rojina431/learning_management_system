from django.db import models
from .usermodel import *
from .subjectmodel import *

class MeetingModel(models.Model):

    meeting_title = models.CharField(max_length=200)
    meeting_url = models.URLField(max_length=200)
    teacher_created = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    meeting_created_data = models.DateTimeField(auto_now=True)
    meeting_subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

