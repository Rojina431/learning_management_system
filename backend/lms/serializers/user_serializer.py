from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from ..models import usermodel
from django.contrib import auth

class UserSerializer(serializers.ModelSerializer):
      class Meta:
          model = usermodel.User
          fields = ['first_name','last_name' ,'email', 'password','mobile','role']

      def create(self, validated_data):
          return usermodel.User.objects.create(**validated_data) 

      def update(self,instance,validated_data):
          instance.password = validated_data.get('password')     
          instance.save()
          return instance   

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200)
    tokens = serializers.CharField(max_length=200,read_only=True)
    class Meta:
        model = usermodel.User
        fields = ['email','password','role','tokens']  

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = auth.authenticate(email=email,password=password)
        if not user:
            raise AuthenticationFailed('User credentials doesnot matched')
        if not user.role == attrs.get('role'):
            raise AuthenticationFailed("No "+ attrs.get('role') + " found for this credentials")     
       
        return user     
        # return user        