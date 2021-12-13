from re import I
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..serializers import meeting_serializers
from ..models import meetingmodel
from ..models import subjectmodel
from rest_framework import status

def ValidateMeetingSubject(value1, value2):
        subject = subjectmodel.Subject.objects.filter(id = value2, subject_teacher = value1)
        if subject:
            return True
        else:
            return False    


class Meeting(APIView):
    permission_classes = [IsAuthenticated]

   

    def get(self, request, format=None):
        data = meetingmodel.MeetingModel.objects.all()
        serializers = meeting_serializers.MeetingSerializers(data, many=True)
        return Response({"data":serializers.data, "success":True}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializers = meeting_serializers.MeetingSerializers(data=request.data)
        if  serializers.is_valid():
            valid_class = ValidateMeetingSubject(request.data["teacher_created"], request.data['meeting_subject'])  
            if valid_class:
              serializers.save()
              return Response({"data":serializers.data, "success":True}, status=status.HTTP_200_OK)
            return Response({"error":"Only the subject teacher are alloweded", "success":False}, status=status.HTTP_400_BAD_REQUEST)    
        else:
            return Response({"error":serializers.errors, "success":False}, status=status.HTTP_400_BAD_REQUEST)    