from rest_framework import serializers
from ..models import assignmentmodel

class AssignmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = assignmentmodel.AssignmentCreate
        fields = ['teacher_create','title','assignment_pdf_create','deadline']

class AssignmentSubmitSerializer(serializers.ModelSerializer):
    class Meta:
         model = assignmentmodel.AssignmentSubmit
         fields = ['student_submit','assignment_pdf_submit']     