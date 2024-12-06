from django.shortcuts import render
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Food
from .serializers import *
from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import *
from .forms import FoodForm
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import viewsets
from rest_framework import status



class FoodListView(APIView):
    def get(self, request):
        foods = Food.objects.all()
        serializer = FoodSerializer(foods, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create_food(request):
    if request.method == 'POST':
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Food item created successfully!'}, status=201)
        return Response(serializer.errors, status=400)

@api_view(['POST'])
def add_to_cart(request):
    data = request.POST
    print(data)  # Debugging step to log incoming data
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    print(f"Name: {name}, Description: {description}, Price: {price}")

    if not name or not description or not price:
        return JsonResponse({'error': 'Missing fields'}, status=400)

    # Handling price and checking for valid inputs
    try:
        price = float(price)
    except ValueError:
        return JsonResponse({'error': 'Invalid price format'}, status=400)
    
    # Create or update the cart item
    cart_item, created = Cart.objects.get_or_create(name=name, defaults={
        'description': description,
        'price': price,
        'quantity': 1
    })

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return JsonResponse({'message': 'Item added to cart', 'cart_item': cart_item.name})

@login_required
def admin_dashboard(request):
    menu_items = Food.objects.all()
    return render(request, 'yash/dashboard.html', {'menu_items': menu_items})

@login_required
def menu_item_list(request):
    menu_items = Food.objects.all()
    return render(request, 'yash/menu_item_list.html', {'menu_items': menu_items})

@login_required
def menu_item_create(request):
    if request.method == 'POST':
        form = FoodForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin_menu_item_list')
    else:
        form = FoodForm()
    return render(request, 'yash/menu_item_form.html', {'form': form})

@login_required
def menu_item_update(request, pk):
    menu_item = get_object_or_404(Food, pk=pk)
    if request.method == 'POST':
        form = FoodForm(request.POST, request.FILES, instance=menu_item)
        if form.is_valid():
            form.save()
            return redirect('admin_menu_item_list')
    else:
        form = FoodForm(instance=menu_item)
    return render(request, 'yash/menu_item_form.html', {'form': form})

@login_required
def menu_item_delete(request, pk):
    menu_item = get_object_or_404(Food, pk=pk)
    if request.method == 'POST':
        menu_item.delete()
        return redirect('admin_menu_item_list')
    return render(request, 'yash/menu_item_confirm_delete.html', {'menu_item': menu_item})


@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['name']
        email = data['email']
        password = data['password']
        phone_number = data.get('phone_number')

        # Check if the user already exists
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        # Create the new user
        user = User(name=name, email=email, phone_number=phone_number)
        user.set_password(password)
        user.save()

        return JsonResponse({'message': 'User created successfully'})
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        password = data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=400)

        # Check the password
        if user.check_password(password):
            # You can add session handling here
            return JsonResponse({'message': 'Login successful', 'user_id': user.user_id,'name': user.name})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
        

class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = FoodItemSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            # Update price based on new quantity if quantity is provided in the request
            if 'quantity' in request.data:
                new_quantity = request.data['quantity']
                unit_price = instance.price / instance.quantity  # Calculate unit price (price per item)
                new_price = unit_price * new_quantity  # Calculate new price based on the updated quantity
                instance.price = new_price  # Update the price in the instance
                instance.quantity = new_quantity  # Update quantity in the instance

            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
