from django.core.exceptions import ValidationError
from rest_framework import serializers
from ..models import *

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = subjectmodel.Subject
        fields = ['id','subject_name','subject_code','grade','subject_teacher']


    # def create(self, validated_data):
    #     return subjectmodel.Subject.objects.create(validated_data)    

    # def update(self, instance, validated_data):
    #     instance.subject_name = validated_data.get('subject_name')
    #     instance.subject_code = validated_data.get('subject_code')
    #     instance.grade = validated_data.get('grade')
    #     instance.save()
    #     return instance  