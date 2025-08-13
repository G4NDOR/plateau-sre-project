# api/permissions.py

from rest_framework.permissions import BasePermission

class IsOwnerOrManager(BasePermission):
    """
    Allows access only to users with the 'owner' or 'manager' role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.profile.role == 'owner' or
            request.user.profile.role == 'manager'
        )

class IsEmployee(BasePermission):
    """
    Allows access only to users with the 'employee' role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.profile.role == 'employee'