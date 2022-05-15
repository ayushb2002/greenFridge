from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('', views.api_home),
    path('auth/get_token', obtain_auth_token),
    path('auth/register', views.api_auth_register),
    path('food/', views.api_add_food_item),
    path('auth/profile', views.api_get_profile)
]