from multiselectfield import MultiSelectField
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from ..models import usermodel
from django.contrib import auth

class UserSerializer(serializers.ModelSerializer):
    
      class Meta:
          model = usermodel.User
          fields = ['first_name','last_name' ,'email', 'password','mobile','role', 'student_class', 'teacher_class', 'roll_no']


      def create(self, validated_data):
          return usermodel.User.objects.create(**validated_data) 

      def update(self,instance,validated_data):
          instance.password = validated_data.get('password')     
          instance.save()
          return instance   

class LoginSerializer(serializers.ModelSerializer):
  
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200)
    access = serializers.CharField(max_length=200,read_only=True)
    refresh = serializers.CharField(max_length=200,read_only=True)
    class Meta:
        model = usermodel.User
        fields = ['email','password','role', 'student_class', 'teacher_class', 'roll_no', 'access','refresh']  


    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = auth.authenticate(email=email,password=password)
        if not user:
            raise AuthenticationFailed({"error":{"details":'User credentials doesnot matched'}})
        if not user.role == attrs.get('role'):
            raise AuthenticationFailed({"error":{"details":"No "+ attrs.get('role') + " found for this credentials"}})     
        
        return user      

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=usermodel.User
        fields = ['id','email','first_name','last_name','mobile', 'role', 'student_class', 'teacher_class', 'roll_no']

# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=usermodel.Student
#         fields = ['id','student','roll_no', 'student_class']   

# class TeacherSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=usermodel.Teacher
#         fields= ['id', 'teacher', 'teacher_class']             

             