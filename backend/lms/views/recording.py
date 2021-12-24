from rest_framework import permissions
from rest_framework.generics import GenericAPIView
from rest_framework import mixins
from ..serializers import recorded_serializer
from ..models import recordedmodel
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

class Recording(GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
      serializer_class = recorded_serializer.RecordedSerializer
      queryset = recordedmodel.RecordedModel.objects.all()
      permission_classes = [IsAuthenticated]
      filter_backends = [DjangoFilterBackend]
      filterset_fields = ['subject', 'teacher']

      def get(self, request, *args, **kwargs):
          return self.list(request, *args, **kwargs)

      def post(self, request, *args, **kwargs):
          return self.create(request, *args, **kwargs)
