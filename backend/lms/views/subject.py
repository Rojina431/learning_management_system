from rest_framework import status,mixins,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import *
from ..models import *
from django_filters.rest_framework import DjangoFilterBackend

class AllSubject(generics.GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
    serializer_class = subject_serializer.SubjectSerializer
    queryset = subjectmodel.Subject.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['subject_code','grade']
    def get(self, request,*args,**kwargs):
        return self.list(request,*args,**kwargs)
    def post(self, request,*args,**kwargs):
        return self.create(request,*args,**kwargs)
     

class SingleSubject(generics.GenericAPIView,mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    serializer_class = subject_serializer.SubjectSerializer
    queryset = subjectmodel.Subject.objects.all()
    
    def get(self, request, *args,**kwargs):
        return self.retrieve(request,*args,**kwargs)
    def put(self, request,*args,**kwargs):
        return self.update(request,*args,**kwargs) 
    def delete(self, request, *args,**kwargs):
        return self.destroy(request,*args,**kwargs)
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)  

# class FilterSubject(generics.GenericAPIView, mixins.RetrieveModelMixin):
#     serializer_class = subject_serializer.SubjectSerializer
#     queryset = subjectmodel.Subject.all()

#     def get(self,request, *args, **kwargs):
#         return self.r           