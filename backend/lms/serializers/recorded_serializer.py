
from rest_framework import serializers
from ..models import recordedmodel

class RecordedSerializer(serializers.ModelSerializer):
    class Meta:
        model = recordedmodel.RecordedModel
        fields = ['recording', 'subject', 'teacher']