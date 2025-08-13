from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
        ('customer', 'Customer'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        # This checks if the user exists before trying to access its username
        if self.user:
            return f'{self.user.username} - {self.get_role_display()}'
        return f'Profile for an unknown user (ID: {self.id})'

        
class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.CharField(max_length=100)
    photo_url = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.name

class InventoryItem(models.Model):
    STATUS_CHOICES = [('In Stock', 'In Stock'), ('Low Stock', 'Low Stock'), ('Out of Stock', 'Out of Stock')]
    
    name = models.CharField(max_length=200, unique=True)
    category = models.CharField(max_length=100)
    stock = models.IntegerField(default=0)
    unit = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='In Stock')

    def __str__(self):
        return self.name

class TrainingModule(models.Model):
    STATUS_CHOICES = [('Completed', 'Completed'), ('In Progress', 'In Progress'), ('Not Started', 'Not Started')]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Not Started')
    progress = models.IntegerField(default=0)
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.title

class ScheduleEntry(models.Model):
    DAY_CHOICES = [
        ('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday'), ('Sunday', 'Sunday')
    ]

    employee_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    shift = models.CharField(max_length=100)
    day = models.CharField(max_length=10, choices=DAY_CHOICES)
    avatar_url = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.employee_name} - {self.day} - {self.shift}"

