from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'regular-pizzas', views.RegularPizzaViewSet)
router.register(r'sicilian-pizzas', views.SicilianPizzaViewSet)
router.register(r'toppings', views.ToppingsViewSet)
router.register(r'subs', views.SubViewSet)
router.register(r'pastas', views.PastaViewSet)
router.register(r'salads', views.SaladViewSet)
router.register(r'dinner-platters', views.DinnerPlattersViewSet)
router.register(r'orders', views.UserOrderViewSet)
router.register(r'saved-carts', views.SavedCartsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('menu/', views.get_menu, name='menu'),
    path('profile/', views.get_user_profile, name='user-profile'),
    path('auth/', include('rest_framework.urls')),
]
