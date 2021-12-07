from rest_framework import serializers
from ..models import assignmentmodel

class AssignmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = assignmentmodel.AssignmentCreate
        fields = ['id','teacher_create','title','assignment_pdf_create','deadline','subject_create']

class AssignmentSubmitSerializer(serializers.ModelSerializer):
    class Meta:
         model = assignmentmodel.AssignmentSubmit
         fields = ['id','student_submit','assignment_pdf_submit','assignment','is_submitted','submited_date']     