import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from backend.fqi.api.serializers import FoodItemSerializer

@api_view(["GET"])
def api_home(request):
    """
    API Documentation
    """
    documentation = "GET / - Documentation"
    return Response({"docs": documentation})

@api_view(["GET", "POST"])
def api_add_food_item(request):
    """
    API Endpoint for retrieving and adding to the model
    """
    if (request.method == "POST"):
        serializer = FoodItemSerializer(data=request.body)
        if (serializer.is_valid(raise_exception=True)):
            instance = serializer.save()
            return Response(serializer.data)

    else:
        pass