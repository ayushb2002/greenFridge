import base64
from cmath import inf
from distutils.command.upload import upload
import json,bson
from django.conf import settings
from djongo import models
from django.db.models.signals import pre_save,post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

import requests
import tensorflow as tf
import tensorflow_hub as hub
import os

def load_model(model_path):
  """
  Loads a saved model from a specified path
  """
  print(f"Loading a saved model from {model_path}...")
  model = tf.keras.models.load_model(model_path,
                                    custom_objects={"KerasLayer": hub.KerasLayer})
  
  return model

BATCH_SIZE= 32
IMG_SIZE = 250

def create_data_batches(X, y=None, batch_size=BATCH_SIZE, valid_data=False, test_data=False):
  """
  Creates batches of data out of image (X) and labels (y) pairs.
  Shuffles the training data, but does not shuffle the validation data.
  Also accepts test data as input (no labels).
  """

  # If the data is the test dataset, we probably don't have labels
  if test_data:
    print("Creating test data batches.. ")
    data = tf.data.Dataset.from_tensor_slices((tf.constant(X))) # Only filepaths and no lables
    data_batch = data.map(process_image).batch(BATCH_SIZE)
    return data_batch
  
  # If the data is the valid dataset, we don't need to shuffle it
  elif valid_data:
    print("Creating validation data batches.. ")
    data = tf.data.Dataset.from_tensor_slices((tf.constant(X), tf.constant(y)))
    data_batch = data.map(get_image_label).batch(BATCH_SIZE)  # Create image, label touples
    return data_batch

  # If the data is the training dataset, we need to shuffle it
  else:
    print("Creating training data batches.. ")
    data = tf.data.Dataset.from_tensor_slices((tf.constant(X), tf.constant(y)))
    # Shuffling the pathnames and labels before mapping image processor function is faster than shuffling images
    data = data.shuffle(buffer_size=len(X))
    # This also turns image path into preprocessed image
    data = data.map(get_image_label)
    # Turn the training data into batches
    data_batch = data.batch(BATCH_SIZE)

  return data_batch

def process_image(image_path):
  """
  Takes image filepath and convert it into tensors
  """

  # Read an image file

  image = tf.io.read_file('temp.jpg')

  # Turn the jpg img into tensors with RBG coding (3 color channel)
  image = tf.image.decode_jpeg(image, channels=3)

  # Convert the color channel values from 0-255 to 0-1 values - NORMALIZATION
  image = tf.image.convert_image_dtype(image, tf.float32)

  # Resize the image (250x250)
  image = tf.image.resize(image, size=[IMG_SIZE, IMG_SIZE])

  return image

def get_image_label(image_path, label):
  """
  Takes an image filename and associated label, processes the image and returns a touple of image, label
  """
  image = process_image(image_path)
  return image, label


loadedModel = load_model(os.path.join("model", "model_fresh_stale.h5"))
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
    image = models.TextField()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def generate_auth_token(sender, instance=None, created=False, **kwargs):
    if (created):
        Token.objects.create(user=instance)

@receiver(pre_save, sender=FoodItem)
def assign_reciever(sender, instance=None, **kwargs):
    f = open('temp.jpg', 'wb')
    f.write(base64.b64decode(instance.image.encode('utf-8')))
    f.close()
    custom_image = ['temp.jpg']
    custom_data = create_data_batches(custom_image, test_data=True)
    prediction  = loadedModel.predict(custom_data)
    print(prediction)
    pred_label = "F" if prediction[0][0] == False and prediction[0][1] == True else "S"
    print(f"Predicted as {pred_label}")
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
        instance.label = pred_label

@receiver(post_save, sender=FoodItem)
def add_assignment(sender, instance=None, created=False, **kwargs):
    if (created):
        rcvId = instance.pickedUpBy
        foodItemId = instance._id
        Assignments.objects.create(foodItem=foodItemId, reciever=rcvId)
        