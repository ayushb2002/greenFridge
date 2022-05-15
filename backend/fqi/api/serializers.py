from rest_framework import serializers
from .models import FoodItem, FoodRequests, Organization
from django.contrib.auth.models import User

class FoodItemSerializer(serializers.Serializer):
    def create(self, validated_data):
        foodItem = FoodItem.objects.create(
            
        )

        return foodItem
    class Meta:
        model = FoodItem

class FoodRequestSerializer(serializers.Serializer):
    class Meta:
        model = FoodRequests

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        return user 
    
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)


class OrganizationSerializer(serializers.Serializer):
    class Meta:
        model = Organization