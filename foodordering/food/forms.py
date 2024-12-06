# forms.py
from django import forms
from .models import Food



class FoodForm(forms.ModelForm):
    class Meta:
        model = Food
        fields = ['title', 'paragraph', 'image','rating','price']