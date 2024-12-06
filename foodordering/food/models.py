from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Save the password securely using Django's password hashers
    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)
    
    # Check the password against the hashed password
    def check_password(self, raw_password):
        return check_password(raw_password, self.password_hash)

    def __str__(self):
        return self.name

class Food(models.Model):
    title = models.CharField(max_length=255)
    paragraph = models.TextField()
    image = models.ImageField(upload_to='menu_images/')
    rating = models.FloatField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.title

class Cart(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def save(self, *args, **kwargs):
        if self.quantity > 0:
            self.total_price = self.price * self.quantity
        else:
            self.total_price = self.price
        super(Cart, self).save(*args, **kwargs)

    def __str__(self):
        return self.name