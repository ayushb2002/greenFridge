from django.contrib import admin
from .models import FoodItem, Organization, Receiver, Assignments 
# Register your models here.

admin.site.register(FoodItem)
admin.site.register(Organization)
admin.site.register(Receiver)
admin.site.register(Assignments)