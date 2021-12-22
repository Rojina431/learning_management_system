from django.db.models import fields
from rest_framework import serializers
from ..models import meetingmodel
from ..models import usermodel
import pytz

class MeetingSerializers(serializers.ModelSerializer):
    def to_representation(self, instance):
        self.fields['meeting_start'] = serializers.DateTimeField(default_timezone=pytz.timezone(instance.meeting_start))
        return super().to_representation(instance)

    class Meta:
        model = meetingmodel.MeetingModel
        fields = ['id', 'meeting_title', 'meeting_start', 'meeting_duration', 'meeting_join_url', 'meeting_timezone', 'meeting_start_url', 'teacher_created', 'meeting_subject']


    # def create(self, validated_data):
    #    return meetingmodel.MeetingModel.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.meeting_title =  validated_data.get('meeting_title')
    #     instance.meeting_url =  validated_data.get('meeting_url')
    #     instance.teacher_created =  validated_data.get('teacher_created')
    #     instance.meeting_subject =  validated_data.get('meeting_subject')
    #     instance.save()
    #     return instance



