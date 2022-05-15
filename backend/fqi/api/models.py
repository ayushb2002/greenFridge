from django.conf import settings
from djongo import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.

class Organization(models.Model):
    id = models.ObjectIdField()
    name = models.CharField(max_length=60)
    address = models.CharField(max_length=256)

class Receiver(models.Model):
    id = models.ObjectIdField()
    name = models.CharField(max_length=60)
    memberOf = models.EmbeddedField(model_container=Organization)
    lat = models.DecimalField(decimal_places=15, max_digits=20)
    lng = models.DecimalField(decimal_places=15, max_digits=20)
    
    
class FoodItem(models.Model):
    id = models.ObjectIdField()
    name = models.CharField(max_length=60)
    label = models.CharField(max_length=2, choices=[("F","Fresh"), ("S", "Stale")])
    postedBy = models.EmailField()
    pickedUp = models.BooleanField(default=False)
    pickedUpBy = models.EmbeddedField(model_container=Organization)
    pickLat = models.DecimalField(decimal_places=15, max_digits=20)
    pickLng = models.DecimalField(decimal_places=15, max_digits=20)

class FoodRequests(models.Model):
    requestBy = models.EmailField()
    assigned = models.EmbeddedField(model_container=FoodItem)
    isCompleted = models.BooleanField(default=False)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def generate_auth_token(sender, instance=None, created=False, **kwargs):
    if (created):
        Token.objects.create(user=instance)