import json
from django.forms import model_to_dict
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User

from api.serializers import FoodItemSerializer
from api.serializers import UserSerializer
from api.models import FoodItem

@api_view(["GET"])
def api_home(request):
    """
    API Documentation
    """
    documentation = "GET / - Documentation"
    return Response({"docs": documentation})

@api_view(["GET", "POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def api_add_food_item(request):
    """
    API Endpoint for retrieving and adding to the model
    """
    if (request.method == "POST"):
        serializer = FoodItemSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            instance = serializer.save()

            return Response({"foodItem": serializer.data, "addedBy": str(request.user)})

    else:
        allFoodItems = FoodItem.objects.all()
        # mDict = model_to_dict(allFoodItems)
        return Response({"foodItems": list(allFoodItems), "requestedBy": str(request.user)})

@api_view(["POST"])
def api_auth_register(request):
    """
    API to register a user
    """
    serialized = UserSerializer(data=request.data)
    if (serialized.is_valid()):
        print(serialized.validated_data)
        user = serialized.create(serialized.validated_data)
        return Response({"user": str(user), "status": "Created"})
    else:
        return Response({"error": "An Error Occured"})
    