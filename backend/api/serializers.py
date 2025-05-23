from rest_framework import serializers
from django.contrib.auth.models import User
from orders.models import Category, RegularPizza, SicilianPizza, Toppings, Sub, Pasta, Salad, DinnerPlatters, UserOrder, SavedCarts

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RegularPizzaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegularPizza
        fields = '__all__'

class SicilianPizzaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SicilianPizza
        fields = '__all__'

class ToppingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toppings
        fields = '__all__'

class SubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sub
        fields = '__all__'

class PastaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pasta
        fields = '__all__'

class SaladSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salad
        fields = '__all__'

class DinnerPlattersSerializer(serializers.ModelSerializer):
    class Meta:
        model = DinnerPlatters
        fields = '__all__'

class UserOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrder
        fields = '__all__'

class SavedCartsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedCarts
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}
