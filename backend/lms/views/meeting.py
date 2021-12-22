from re import I
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..serializers import meeting_serializers
from ..models import meetingmodel
from ..models import subjectmodel
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
import jwt
import requests
import json
from time import time
from datetime import datetime, timedelta
  
# Using current time
ini_time_for_now = datetime.now()
  
# printing initial_date
print ("initial_date", str(ini_time_for_now))
  
# Some another datetime
new_final_time = ini_time_for_now + \
                 timedelta(days = 2)
  
# printing new final_date
print ("new_final_time", str(new_final_time))
  
  
# Enter your API key and your API secret
API_KEY = 'CjUxl-xZRJaX_sIMj31uIA'
API_SEC = 'fn4b6PlYCUXcZSzJYv25F2vvG55uNfk7j7A4'
  
# create a function to generate a token 
# using the pyjwt library
def generateToken():
    token = jwt.encode(
        
        # Create a payload of the token containing 
        # API Key & expiration time
        {'iss': API_KEY, 'exp': time() + 5000},
          
        # Secret used to generate token signature
        API_SEC,
          
        # Specify the hashing alg
        algorithm='HS256'
    )
    return token
  
# create json data for post requests
meetingdetails = {"type": 2,
                  "timezone": "Kathmandu",
                  "agenda": "test",
  
                  "recurrence": {"type": 1,
                                 "repeat_interval": 1
                                 },
                  "settings": {"host_video": "true",
                               "participant_video": "true",
                               "join_before_host": "False",
                               "mute_upon_entry": "False",
                               "watermark": "true",
                               "audio": "voip",
                               "auto_recording": "cloud"
                               }
                  }    

def createMeeting(data):

      moredetails = {'topic':data['meeting_title'], 'start_time':data['meeting_start'], 'duration':data['meeting_duration']}
      moredetails.update(meetingdetails)
      headers = {'authorization': 'Bearer %s' % generateToken(),
               'content-type': 'application/json'}
      r = requests.post(
        f'https://api.zoom.us/v2/users/me/meetings', 
      headers=headers, data=json.dumps(moredetails))
  
      y = json.loads(r.text)
      return y    

total = []
def getMeeting():
    headers = {'authorization': 'Bearer %s' % generateToken(),
               'content-type': 'application/json'}
    r = requests.get(f'https://api.zoom.us/v2/users/me/meetings', headers=headers)
    y = json.loads(r.text)
    total.append(y)
    if y['next_page_token'] != '':
        getMeeting()
    return total          

def ValidateMeetingSubject(value1, value2):
        subject = subjectmodel.Subject.objects.filter(id = value2, subject_teacher = value1)
        if subject:
            return True
        else:
            return False    

def filterteacher(meetings):
    data = meetingmodel.MeetingModel.objects.all()
    filtered = []
    totalfiltered =[]
    for meet in meetings:
      for d in data:
          if meet['join_url'] == d.meeting_join_url :
              filtered.append(d)
    for filters in filtered:
        time2 = filters.meeting_duration 
        time1 = filters.meeting_start + \
                timedelta(hours=time2.total_seconds() / 60)
        
        currenttime = datetime.now()
        diff = (time1.replace(tzinfo=None) - currenttime).total_seconds()
        if diff > 1:
            totalfiltered.append(filters)
    return totalfiltered     

class Meeting(APIView):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['teacher_created', 'meeting_subject']  

    def get(self, request, format=None):
        allmeetings = getMeeting()
      
        filteredd = filterteacher(allmeetings[0]['meetings'])
        serializers = meeting_serializers.MeetingSerializers(filteredd, many=True)
        return Response({"data":serializers.data, "success":True}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        meeting_detail = createMeeting(request.data)
        print('hello')
        datas = request.data
        datas['meeting_join_url'] = meeting_detail['join_url']
        datas['meeting_start_url'] = meeting_detail['start_url']
        datas['meeting_timezone'] = meeting_detail['timezone']
        print(request.data)
        serializers = meeting_serializers.MeetingSerializers(data=datas)
        if  serializers.is_valid():
            valid_class = ValidateMeetingSubject(request.data["teacher_created"], request.data['meeting_subject'])  
            if valid_class:
              serializers.save()
              print('hi')
              return Response({"data":serializers.data, "success":True}, status=status.HTTP_200_OK)
            return Response({"error":"Only the subject teacher are alloweded", "success":False}, status=status.HTTP_400_BAD_REQUEST)    
        else:
            return Response({"error":serializers.errors, "success":False}, status=status.HTTP_400_BAD_REQUEST)    