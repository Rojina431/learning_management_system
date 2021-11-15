from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import user_serializer
from django.contrib.auth.hashers import make_password,check_password
import re

def validateMobile(mobile):
    if re.match('^[0-9]*$',mobile):
        return True
    return False    

#Create your views here.
@api_view(['POST'])
def Register(request):
    serializer = user_serializer.UserSerializer(data=request.data)
   
    if serializer.is_valid():
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        valid_mobile=serializer.validated_data['mobile']
        if valid_mobile:
          serializer.save()
          return Response({"data":serializer.data,"success":True},status=status.HTTP_200_OK)
        return Response({"error":"Phone no most contains numeric characters"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)