from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from .views import *
from .views import *
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'food-items', FoodItemViewSet)

urlpatterns = [
    path('api/foods/', FoodListView.as_view(), name='food-list'),
    path('api/create-food/', create_food, name='create_food'),
    path('api/add-to-cart/', add_to_cart, name='add_to_cart'),

    path('dashboard/', views.admin_dashboard, name='dashboard'),
    path('menu-items/', views.menu_item_list, name='admin_menu_item_list'),
    path('menu-items/create/', views.menu_item_create, name='admin_menu_item_create'),
    path('menu-items/<int:pk>/update/', views.menu_item_update, name='admin_menu_item_update'),
    path('menu-items/<int:pk>/delete/', views.menu_item_delete, name='admin_menu_item_delete'),

    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),

     path('', include(router.urls)),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)