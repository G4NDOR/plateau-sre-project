from django.urls import path
from . import views

urlpatterns = [
    path('menu/', views.get_menu, name='menu'),
    path('inventory/', views.get_inventory, name='inventory'),
    path('training/', views.get_training, name='training'),
    path('schedule/', views.get_schedule, name='schedule'),
    path('dashboard/', views.get_dashboard_data, name='dashboard'),
]
