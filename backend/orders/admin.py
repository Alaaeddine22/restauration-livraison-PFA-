from django.contrib import admin
from .models import Category, RegularPizza, SicilianPizza, Toppings, Sub, Pasta, Salad, DinnerPlatters, UserOrder, SavedCarts
from tinymce.widgets import TinyMCE
from django.db import models
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class CategoryAdmin(admin.ModelAdmin):
    formfield_overrides = {
            models.TextField: {'widget': TinyMCE()},
            }

class RegularPizzaAdmin(admin.ModelAdmin):
    formfield_overrides = {
            models.TextField: {'widget': TinyMCE()},
            }

class SicilianPizzaAdmin(admin.ModelAdmin):
    formfield_overrides = {
            models.TextField: {'widget': TinyMCE()},
            }
User = get_user_model()

class Command(BaseCommand):
    help = 'Creates a delivery staff user'

    def handle(self, *args, **kwargs):
        username = 'delivery'
        email = 'delivery@example.com'
        password = 'delivery123'
        
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(
                username=username,
                email=email,
                password=password,
                is_delivery_staff=True
            )
            self.stdout.write(self.style.SUCCESS('Delivery user created successfully'))
        else:
            self.stdout.write(self.style.WARNING('Delivery user already exists'))

admin.site.register(Category,CategoryAdmin)
admin.site.register(RegularPizza, RegularPizzaAdmin)
admin.site.register(SicilianPizza, SicilianPizzaAdmin)
admin.site.register(Toppings)
admin.site.register(Sub)
admin.site.register(Pasta)
admin.site.register(Salad)
admin.site.register(DinnerPlatters)
admin.site.register(UserOrder)
admin.site.register(SavedCarts)
