from rest_framework.views import APIView
from rest_framework.response import Response

# This is a hardcoded list of menu items to act as a placeholder.
# We will replace this with a real Square API call later.
FAKE_MENU_DATA = [
    {
        'id': 'ITEM-1',
        'name': 'Cloud-Native Burger',
        'description': 'A delicious burger served with a side of containerized fries.',
        'price': '15.99'
    },
    {
        'id': 'ITEM-2',
        'name': 'Kubernetes Kebab',
        'description': 'Perfectly orchestrated and scalable skewers of meat and vegetables.',
        'price': '18.50'
    },
    {
        'id': 'ITEM-3',
        'name': 'SRE-viche',
        'description': 'A reliable and highly available citrus-cured fish appetizer.',
        'price': '12.00'
    },
    {
        'id': 'ITEM-4',
        'name': 'Observability Onion Rings',
        'description': 'You can see every metric of flavor in these crispy rings.',
        'price': '8.75'
    },
    {
        'id': 'ITEM-5',
        'name': 'Terraform Tiramisu',
        'description': 'A layered dessert, provisioned perfectly every time.',
        'price': '9.00'
    }
]

class MenuView(APIView):
    """
    A view that returns a hardcoded menu list.
    This is a placeholder to allow frontend development to proceed
    without a live connection to the Square API.
    """
    def get(self, request):
        # We simply return our fake data list.
        # The Response object will automatically convert it to JSON.
        return Response(FAKE_MENU_DATA)
