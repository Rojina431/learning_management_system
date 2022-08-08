from django.db import models
from .usermodel import *
from .subjectmodel import *

class MeetingModel(models.Model):

    meeting_title = models.CharField(max_length=200)
    teacher_created = models.ForeignKey(User, on_delete=models.CASCADE)
    meeting_created_date = models.DateTimeField(auto_now=True)
    meeting_subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    meeting_duration = models.DurationField()
    meeting_start = models.DateTimeField()
    meeting_join_url = models.URLField(max_length=1000)
    meeting_start_url = models.URLField(max_length=5000)
    meeting_timezone = models.CharField(max_length=250)

