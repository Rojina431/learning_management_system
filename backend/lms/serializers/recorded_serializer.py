from django.db.models import fields
from rest_framework import serializers
from ..models import recordedmodel
class RecordedSerializer(serializers.ModelSerializer):
    class Meta:
        model = recordedmodel
        fields = ['recording', 'subject', 'teacher']