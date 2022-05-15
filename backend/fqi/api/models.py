from cmath import inf
import json,bson
from django.conf import settings
from djongo import models
from django.db.models.signals import pre_save,post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

import requests
# Create your models here.

class Organization(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=60)
    address = models.CharField(max_length=256)

class Receiver(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=60)
    memberOf = models.CharField(max_length=70)
    lat = models.DecimalField(decimal_places=15, max_digits=20)
    lng = models.DecimalField(decimal_places=15, max_digits=20)
    
class Assignments(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    reciever = models.CharField(max_length=30)
    foodItem = models.CharField(max_length=30)
    pickedUp = models.BooleanField(default=False)
    
class FoodItem(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=60)
    label = models.CharField(max_length=2, choices=[("F","Fresh"), ("S", "Stale")])
    postedBy = models.EmailField()
    pickedUp = models.BooleanField(default=False)
    pickedUpBy = models.CharField(max_length=70, blank=True)
    pickLat = models.DecimalField(decimal_places=15, max_digits=20)
    pickLng = models.DecimalField(decimal_places=15, max_digits=20)
    image = models.ImageField()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def generate_auth_token(sender, instance=None, created=False, **kwargs):
    if (created):
        Token.objects.create(user=instance)

@receiver(pre_save, sender=FoodItem)
def assign_reciever(sender, instance=None, **kwargs):
    allRecievers = Receiver.objects.all()
    foodLocation = (str(instance.pickLng), str(instance.pickLat))
    minDist = inf
    minRecieverId = ""
    for receiver in allRecievers:
        location = (str(receiver.lng), str(receiver.lat))
        url = "https://api.mapbox.com/directions/v5/mapbox/driving/"+ location[0] + "%2C" + location[1] + "%3B" + foodLocation[0] + "%2C" + foodLocation[1] + "?alternatives=false&continue_straight=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1Ijoib21pY3JvbmRldnMiLCJhIjoiY2wzNzJ6cWZpMm4zcDNibWhjcGJyMHQzdiJ9.U727QhJScv9y9FZnHZROsg"
        map_post = requests.get(url)
        data = json.loads(map_post.text)
        if (len(data['routes']) <= 0):
            return
        dist = float(data['routes'][0]['distance'])/1000
        if (dist < minDist):
            minRecieverId = receiver._id
            minDist = dist
        instance.pickedUpBy = minRecieverId

@receiver(post_save, sender=FoodItem)
def add_assignment(sender, instance=None, created=False, **kwargs):
    if (created):
        rcvId = instance.pickedUpBy
        foodItemId = instance._id
        Assignments.objects.create(foodItem=foodItemId, reciever=rcvId)
        