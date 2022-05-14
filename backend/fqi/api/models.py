from djongo import models
# Create your models here.

class Organization(models.Model):
    name = models.CharField(max_length=60)
    address = models.CharField(max_length=256)

class Receiver(models.Model):
    name = models.CharField(max_length=60)
    memberOf = models.EmbeddedField(model_container=Organization)
    lat = models.DecimalField()
    lng = models.DecimalField()

class User(models.Model):
    email = models.EmailField()
    password = models.CharField()
    name = models.CharField(max_length=60)
    
class FoodItem(models.Model):
    name = models.CharField(max_length=60)
    label = models.CharField(choices=["Fresh", "Stale"])
    postedBy = models.EmbeddedField(model_container=User)
    pickedUp = models.BooleanField(default=False)
    pickedUpBy = models.EmbeddedField(model_container=Organization)
    pickLat = models.DecimalField()
    pickLng = models.DecimalField()

class FoodRequests(models.Model):
    requestBy = models.EmbeddedField(model_container=User)
    assigned = models.EmbeddedField(model_container=FoodItem)
    isCompleted = models.BooleanField(default=False)