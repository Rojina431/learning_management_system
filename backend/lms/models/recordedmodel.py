from django.db import models
from django.core.validators import FileExtensionValidator
from .subjectmodel import Subject
from .usermodel import User

class RecordedModel(models.Model):
   recording = models.FileField(upload_to='meeting_record', validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'm4a'])])
   subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
   teacher  = models.ForeignKey(User, on_delete=models.CASCADE)
   