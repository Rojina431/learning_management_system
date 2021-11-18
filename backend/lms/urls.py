from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('signup/', register.Register),
    path('login/',register.Login),
    path('subject/',subject.AllSubject.as_view()),
    path('subject/<int:pk>',subject.SingleSubject.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/',  TokenVerifyView.as_view(), name='token_verify')
]