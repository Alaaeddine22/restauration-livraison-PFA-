from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

from orders.models import Category, RegularPizza, SicilianPizza, Toppings, Sub, Pasta, Salad, DinnerPlatters, UserOrder, SavedCarts
from .serializers import (
    CategorySerializer, RegularPizzaSerializer, SicilianPizzaSerializer, 
    ToppingsSerializer, SubSerializer, PastaSerializer, SaladSerializer,
    DinnerPlattersSerializer, UserOrderSerializer, SavedCartsSerializer,
    UserSerializer
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RegularPizzaViewSet(viewsets.ModelViewSet):
    queryset = RegularPizza.objects.all()
    serializer_class = RegularPizzaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SicilianPizzaViewSet(viewsets.ModelViewSet):
    queryset = SicilianPizza.objects.all()
    serializer_class = SicilianPizzaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ToppingsViewSet(viewsets.ModelViewSet):
    queryset = Toppings.objects.all()
    serializer_class = ToppingsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SubViewSet(viewsets.ModelViewSet):
    queryset = Sub.objects.all()
    serializer_class = SubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PastaViewSet(viewsets.ModelViewSet):
    queryset = Pasta.objects.all()
    serializer_class = PastaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SaladViewSet(viewsets.ModelViewSet):
    queryset = Salad.objects.all()
    serializer_class = SaladSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DinnerPlattersViewSet(viewsets.ModelViewSet):
    queryset = DinnerPlatters.objects.all()
    serializer_class = DinnerPlattersSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserOrderViewSet(viewsets.ModelViewSet):
    queryset = UserOrder.objects.all()
    serializer_class = UserOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter orders to show only the current user's orders
        user = self.request.user
        if user.is_staff:
            return UserOrder.objects.all()
        return UserOrder.objects.filter(user=user)


class SavedCartsViewSet(viewsets.ModelViewSet):
    queryset = SavedCarts.objects.all()
    serializer_class = SavedCartsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter saved carts to show only the current user's saved carts
        user = self.request.user
        return SavedCarts.objects.filter(user=user)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_menu(request):
    """Get all menu items for the frontend"""
    categories = Category.objects.all()
    regular_pizzas = RegularPizza.objects.all()
    sicilian_pizzas = SicilianPizza.objects.all()
    toppings = Toppings.objects.all()
    subs = Sub.objects.all()
    pastas = Pasta.objects.all()
    salads = Salad.objects.all()
    dinner_platters = DinnerPlatters.objects.all()
    
    data = {
        'categories': CategorySerializer(categories, many=True).data,
        'regular_pizzas': RegularPizzaSerializer(regular_pizzas, many=True).data,
        'sicilian_pizzas': SicilianPizzaSerializer(sicilian_pizzas, many=True).data,
        'toppings': ToppingsSerializer(toppings, many=True).data,
        'subs': SubSerializer(subs, many=True).data,
        'pastas': PastaSerializer(pastas, many=True).data,
        'salads': SaladSerializer(salads, many=True).data,
        'dinner_platters': DinnerPlattersSerializer(dinner_platters, many=True).data,
    }
    
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get the current user's profile"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
