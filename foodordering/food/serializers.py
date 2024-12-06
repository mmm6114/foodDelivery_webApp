from rest_framework import serializers
from .models import *

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'title', 'paragraph', 'image', 'rating', 'price']

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"