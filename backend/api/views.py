from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MenuItem, InventoryItem, TrainingModule, ScheduleEntry
from .serializers import MenuItemSerializer, InventoryItemSerializer, TrainingModuleSerializer, ScheduleEntrySerializer
from collections import defaultdict
import json
from pathlib import Path

# We are using function-based views for simplicity.

@api_view(['GET'])
def get_menu(request):
    """
    Serves the menu, grouped by category.
    """
    items = MenuItem.objects.all()
    # Group items by category
    grouped_items = defaultdict(list)
    for item in items:
        serializer = MenuItemSerializer(item)
        grouped_items[item.category].append(serializer.data)
    return Response(grouped_items)

@api_view(['GET'])
def get_inventory(request):
    items = InventoryItem.objects.all()
    serializer = InventoryItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_training(request):
    modules = TrainingModule.objects.all()
    serializer = TrainingModuleSerializer(modules, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_schedule(request):
    """
    Serves the schedule, grouped by day.
    """
    entries = ScheduleEntry.objects.all()
    grouped_schedule = defaultdict(list)
    for entry in entries:
        serializer = ScheduleEntrySerializer(entry)
        grouped_schedule[entry.day].append(serializer.data)
    return Response(grouped_schedule)

# You can add a view for the dashboard later
# @api_view(['GET'])
# def get_dashboard_data(request):
#     # Logic to aggregate sales, orders, etc.
#     pass

@api_view(['GET'])
def get_dashboard_data(request):
    """
    Serves the calculated dashboard data.
    For now, it reads from a static JSON file.
    """
    # Define the path to your fixtures directory
    fixture_dir = Path(__file__).resolve().parent / 'fixtures'
    
    # Open and read the dashboard.json file
    with open(fixture_dir / 'dashboard.json') as f:
        dashboard_data = json.load(f)
    
    return Response(dashboard_data)
