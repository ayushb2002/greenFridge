import base64,io
from PIL import Image
from rest_framework import serializers
from .models import FoodItem, Organization, Receiver
from django.contrib.auth.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile

def decode_img(data):
    try:
        data = base64.b64decode(data.encode('utf-8'))
        buf = io.BytesIO(data)
        img = Image.open(buf)
        return img
    except:
        return None

class FoodItemSerializer(serializers.Serializer):
    def create(self, validated_data):
        foodItem = FoodItem.objects.create(
            name=validated_data.get('name'),
            postedBy=validated_data.get('posted_by'),
            pickedUp=validated_data.get('picked_up', False),
            pickedUpBy=validated_data.get('org_name'),
            pickLat=validated_data.get('pick_lat', 0.00000),
            pickLng=validated_data.get('pick_lng', 0.00000),
            image = validated_data.get('img_data', None)
        )
        
        return foodItem
    class Meta:
        model = FoodItem

class RecieverSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        pass
    class Meta:
        model = Receiver

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