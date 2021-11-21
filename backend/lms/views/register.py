from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import user_serializer
from django.contrib.auth.hashers import make_password,check_password
from ..models import *


def validateMobile(mobile):
  print(mobile.isdigit())
  if mobile.isdigit():
      return True
  else:
      return False        

#Create your views here.
@api_view(['POST'])
def Register(request):
    serializer = user_serializer.UserSerializer(data=request.data) 
    if serializer.is_valid():
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        valid_mobile=validateMobile(serializer.validated_data['mobile'])
        if valid_mobile:
          serializer.save()
          return Response({"data":serializer.data,"success":True},status=status.HTTP_200_OK)
        return Response({"error":{"mobile":["Phone no most contains numeric characters"]}}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error":serializer.errors,"success":False},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def Login(request):
  serializer = user_serializer.LoginSerializer(data = request.data)
  user = usermodel.User.objects.filter(email=request.data["email"])
  print(user[0].id)
  if serializer.is_valid():
    return Response({"data":serializer.data,"success":True,"id":user[0].id,"student_class":user[0].student_class,"teacher_class":user[0].teacher_class},status=status.HTTP_200_OK)    
  else:
   return Response({"error":serializer.errors,"success":False},status=status.HTTP_400_BAD_REQUEST)  