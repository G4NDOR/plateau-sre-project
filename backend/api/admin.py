from django.contrib import admin
from .models import MenuItem, InventoryItem, TrainingModule, ScheduleEntry

# Register your models here to make them accessible in the admin panel.
admin.site.register(MenuItem)
admin.site.register(InventoryItem)
admin.site.register(TrainingModule)
admin.site.register(ScheduleEntry)