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
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh')
]