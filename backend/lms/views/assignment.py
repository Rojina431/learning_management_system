from rest_framework import permissions
from rest_framework.generics import GenericAPIView
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from ..serializers import *
from ..models import *
from django_filters.rest_framework import DjangoFilterBackend


class AssignmentCreate(GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
    serializer_class = assignment_serializer.AssignmentCreateSerializer
    queryset = assignmentmodel.AssignmentCreate.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['subject_create','teacher_create']
    def get(self,request,*args,**kwargs):
        return self.list(request,*args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request,*args,**kwargs)

class SingleAssignmentCreate(GenericAPIView,mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    serializer_class = assignment_serializer.AssignmentCreateSerializer
    queryset = assignmentmodel.AssignmentCreate.objects.all()
    
    permission_classes = [IsAuthenticated]
    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)

    def put(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)

    def delete(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request,*args,**kwargs)    

class AssignmentSubmit(GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
    serializer_class = assignment_serializer.AssignmentSubmitSerializer
    queryset = assignmentmodel.AssignmentSubmit.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['student_submit', 'assignment']

    def get(self,request,*args,**kwargs):
        return self.list(request,*args,**kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request,*args,**kwargs)

class SingleAssignmentSubmit(GenericAPIView,mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    serializer_class = assignment_serializer.AssignmentSubmitSerializer
    queryset = assignmentmodel.AssignmentSubmit.objects.all()
    permission_classes = [IsAuthenticated]
    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)

    def put(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)

    def delete(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request,*args,**kwargs)   

class AssignmentGrade(GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    serializer_class = assignment_serializer.AssignmentGradeSerializer
    queryset = assignmentmodel.AssignmentGrade.objects.all()
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs) 

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)                                