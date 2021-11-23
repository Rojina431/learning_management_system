from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

urlpatterns = [
    path('signup/', register.Register),
    path('login/',register.Login),
    path('subject/',subject.AllSubject.as_view()),
    path('subject/<int:pk>',subject.SingleSubject.as_view()),
    path('assignment_create/',assignment.AssignmentCreate.as_view()),
    path('assignment_create/<int:pk>',assignment.SingleAssignmentCreate.as_view()),
    path('assignment_submit/',assignment.AssignmentSubmit.as_view()),
    path('assignment/<int:pk>',assignment.SingleAssignmentSubmit.as_view()),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh')
]