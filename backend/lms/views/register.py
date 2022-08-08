from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from ..serializers import user_serializer
from django.contrib.auth.hashers import make_password,check_password
from ..models import *
from rest_framework.permissions import IsAuthenticated


def validateMobile(mobile):
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
  
  if serializer.is_valid():
    user = usermodel.User.objects.filter(email=request.data["email"])
    if user[0].role == request.data["role"]:
      return Response({"data":serializer.data,"success":True,"user_id":user[0].id, "name":user[0].first_name + " " + user[0].last_name , "student_class":user[0].student_class,"teacher_class":user[0].teacher_class,"roll_no":user[0].roll_no},status=status.HTTP_200_OK)   
    else : 
      roles = "Admin"
      if request.data.role == 0:
        roles = "Student"
      elif request.data.role == 1:
        roles = "Teacher"
      else:
        roles = "Admin"    

      return Response({"error":{"details":roles + "not registered"},"success":False},status=status.HTTP_401_UNAUTHORIZED)   

  else:
   return Response({"error":serializer.errors,"success":False},status=status.HTTP_400_BAD_REQUEST)  

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Users(request):
  user = usermodel.User.objects.all()
  serializer = user_serializer.UserSerializer(user, many=True)
  return Response({"data":serializer.data, "success":True}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetUserById(request, pk):
  user = usermodel.User.objects.filter(id = pk)
  serializer = user_serializer.UserSerializer(user)
  return Response({"data":serializer.data, "success":True}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def Students(request):
#   student = usermodel.Student.objects.all()
#   serializer = user_serializer.StudentSerializer(student, many=True)
#   return Response({"data":serializer.data, "success":True}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def Teachers(request):
#   teacher = usermodel.Teacher.objects.all()
#   serializer = user_serializer.TeacherSerializer(teacher, many=True)
#   return Response({"data":serializer.data, "success":True}, status=status.HTTP_200_OK)

