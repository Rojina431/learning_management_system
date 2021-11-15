from rest_framework import serializers
from ..models import usermodel

class UserSerializer(serializers.ModelSerializer):
      class Meta:
          model = usermodel.User
          fields = ['first_name','last_name' ,'email', 'password','mobile']

      def create(self, validated_data):
          return usermodel.User.objects.create(**validated_data) 

      def update(self,instance,validated_data):
          instance.password = validated_data.get('password')     
          instance.save()
          return instance   