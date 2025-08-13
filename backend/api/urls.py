# api/urls.py

from django.urls import path
from . import views
# Import your new custom view
from .views import MyTokenObtainPairView

urlpatterns = [
    # --- Authentication URLs ---
    # This now uses your custom view to include the role in the token
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register_user, name='register'),

    # --- Your Existing API Endpoints ---
    path('menu/', views.get_menu, name='menu'),
    path('inventory/', views.get_inventory, name='inventory'),
    path('training/', views.get_training, name='training'),
    path('schedule/', views.get_schedule, name='schedule'),
    path('dashboard/', views.get_dashboard_data, name='dashboard'),
]
