from rest_framework import serializers
from .models import FoodItem, FoodRequests, User, Organization

class FoodItemSerializer(serializers.Serializer):
    class Meta:
        model = FoodItem

class FoodRequestSerializer(serializers.Serializer):
    class Meta:
        model = FoodRequests

class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['email', 'name']

class OrganizationSerializer(serializers.Serializer):
    class Meta:
        model = Organization