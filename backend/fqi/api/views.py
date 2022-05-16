import bson
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from api.serializers import FoodItemSerializer
from api.serializers import UserSerializer
from api.models import FoodItem
from api.models import Assignments

def convertToDict(obj):
    return {"id": str(obj._id),"name": obj.name, "label": obj.label, "postedBy": obj.postedBy, "pickedUp": obj.pickedUp, "pickedUpBy": obj.pickedUpBy, "pickLat": str(obj.pickLat), "pickLng": str(obj.pickLng)}

def userToDict(user):
    return {"id": user.id, "name": user.username, "email": user.email, "first_name": user.first_name, "last_name": user.last_name}

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
            instance = serializer.create(request.data)
            return Response({"foodItem": str(instance), "addedBy": str(request.user)})
    else:
        params = request.query_params.get('id', None)
        if (params):
            foodItems = FoodItem.objects.get(_id=bson.ObjectId(params))
            return Response({"foodItem": convertToDict(foodItems), "requestedBy": str(request.user)})
        allFoodItems = FoodItem.objects.all()
        fI = []
        for i in range(0, len(allFoodItems)):
            fI.append(convertToDict(allFoodItems[i]))
        return Response({"foodItems": fI, "requestedBy": str(request.user)})

@api_view(["POST"])
def api_auth_register(request):
    """
    API to register a user
    """
    serialized = UserSerializer(data=request.data, files=request.files)
    if (serialized.is_valid()):
        user = serialized.create(serialized.validated_data)
        return Response({"user": str(user), "status": "Created"})
    else:
        return Response({"error": "An Error Occured"})
    

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def api_set_picked_up(request):
    body = request.data
    foodId = body['food_id']
    foodId_int = body['food_id_int']

    FoodItem.objects.filter(pk=bson.ObjectId(foodId)).update(pickedUp=True)
    Assignments.objects.filter(foodItem=foodId_int).update(pickedUp=True)
    return Response({"food_id": foodId, "status": "Picked up"})

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def api_get_profile(request):
    return Response(userToDict(request.user))


