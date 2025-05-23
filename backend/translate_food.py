import os
import django
import random
import sys

# Configurer l'environnement Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pizza.settings')
django.setup()

# Importer les modèles après avoir configuré Django
print("Importing models...")
try:
    from orders.models import Category, DinnerPlatters, Pasta, RegularPizza, SicilianPizza, Salad, Sub, Toppings
    print("Models imported successfully")
except Exception as e:
    print(f"Error importing models: {e}")
    sys.exit(1)

# Nouvelles descriptions en anglais pour les différentes catégories
PIZZA_DESCRIPTIONS = [
    "Our authentic pizza is made with hand-stretched dough, topped with San Marzano tomato sauce and premium mozzarella cheese. Baked to perfection in our traditional wood-fired oven.",
    "Savor the flavors of Italy with our signature pizza, featuring a perfect blend of herbs, high-quality cheese, and gourmet toppings on our house-made thin crust.",
    "This delicious pizza combines traditional ingredients with innovative toppings for a unique flavor experience. Comes with a crispy crust and melted cheese that stretches with every bite."
]

PASTA_DESCRIPTIONS = [
    "Al dente pasta served with our slow-simmered sauce made from vine-ripened tomatoes and fresh herbs. Topped with freshly grated Parmesan cheese.",
    "This classic pasta dish features perfectly cooked noodles tossed in our signature sauce, made from a secret family recipe passed down through generations.",
    "Our gourmet pasta is made fresh daily and paired with a rich, flavorful sauce and premium ingredients. Served with garlic bread on the side."
]

SALAD_DESCRIPTIONS = [
    "A refreshing mix of crisp greens, colorful vegetables, and house-made dressing. Each salad is prepared fresh to order with locally sourced ingredients when available.",
    "This nutritious salad combines fresh vegetables, premium toppings, and our signature dressing for a perfect balance of flavors and textures.",
    "Enjoy a healthy blend of seasonal greens and vegetables, topped with your choice of dressing. A perfect light meal or side dish to complement your main course."
]

SUB_DESCRIPTIONS = [
    "Our hearty submarine sandwich is served on freshly baked bread and filled with premium meats, cheeses, and vegetables. Each sub comes with your choice of toppings and dressing.",
    "This generous sandwich features layers of quality ingredients on our artisanal bread. Perfect for a satisfying meal any time of day.",
    "A classic sub made with premium ingredients, served on fresh-baked bread with your choice of toppings. Every bite delivers exceptional flavor."
]

PLATTER_DESCRIPTIONS = [
    "This generous platter serves 2-3 people and includes a selection of our most popular items. Perfect for sharing with family and friends.",
    "Our dinner platter features a delicious assortment of favorites, beautifully arranged and ready to enjoy. Ideal for gatherings or family meals.",
    "Enjoy this abundant platter of delicious foods prepared with care using premium ingredients. Perfect for sharing at any celebration or get-together."
]

CATEGORY_DESCRIPTIONS = [
    "Explore our selection of quality dishes made with fresh ingredients and prepared with care. Each item represents our commitment to authentic flavors and traditional recipes.",
    "This category features our chef's special selections, prepared using time-honored techniques and the finest ingredients available.",
    "Browse through our carefully curated offerings, each dish crafted to deliver exceptional taste and quality. We take pride in every item we serve."
]

TOPPING_DESCRIPTIONS = [
    "Premium quality topping that adds flavor and texture to your dish. Our toppings are carefully selected for freshness and taste.",
    "Enhance your meal with this delicious topping, prepared fresh and ready to add the perfect finishing touch to your order.",
    "This flavorful topping is made with quality ingredients to enhance your dining experience. A perfect addition to customize your meal."
]

def update_descriptions():
    """Update food descriptions with new English paragraphs"""
    print("Starting update of food descriptions...")
    
    # Verify models exist and can be accessed
    try:
        print(f"Category count: {Category.objects.count()}")
        print(f"DinnerPlatters count: {DinnerPlatters.objects.count()}")
        print(f"Pasta count: {Pasta.objects.count()}")
        print(f"RegularPizza count: {RegularPizza.objects.count()}")
        print(f"SicilianPizza count: {SicilianPizza.objects.count()}")
        print(f"Salad count: {Salad.objects.count()}")
        print(f"Sub count: {Sub.objects.count()}")
        print(f"Toppings count: {Toppings.objects.count()}")
    except Exception as e:
        print(f"Error accessing models: {e}")
        sys.exit(1)
    
    # Map models to their new description lists
    model_descriptions = {
        Category: CATEGORY_DESCRIPTIONS,
        DinnerPlatters: PLATTER_DESCRIPTIONS,
        Pasta: PASTA_DESCRIPTIONS,
        RegularPizza: PIZZA_DESCRIPTIONS,
        SicilianPizza: PIZZA_DESCRIPTIONS,
        Salad: SALAD_DESCRIPTIONS,
        Sub: SUB_DESCRIPTIONS,
        Toppings: TOPPING_DESCRIPTIONS
    }
    
    # Update descriptions for each model
    for model, descriptions in model_descriptions.items():
        update_model_descriptions(model, descriptions)
    
    print("Description update completed successfully!")

def update_model_descriptions(model, descriptions, description_field='description'):
    """Update descriptions for a specific model"""
    print(f"Updating descriptions for {model.__name__}")
    
    try:
        items = model.objects.all()
        print(f"Found {items.count()} items to update")
        
        if items.count() == 0:
            print(f"No items found for {model.__name__}, skipping")
            return
            
        # Check if the first item has a description field
        first_item = items.first()
        if not hasattr(first_item, description_field):
            print(f"ERROR: {model.__name__} does not have a '{description_field}' field!")
            print(f"Available fields: {[f.name for f in first_item._meta.fields]}")
            return
            
        count = 0
        
        for item in items:
            # Choose a random description from the list
            new_description = random.choice(descriptions)
            
            # Get current description
            old_description = getattr(item, description_field, "")
            print(f"Item: {item}, Current description: '{old_description}'")
            
            # Update the item's description
            try:
                setattr(item, description_field, new_description)
                item.save()
                count += 1
                print(f"Updated: {item} - New: '{new_description}'")
            except Exception as e:
                print(f"Error updating {item}: {e}")
        
        print(f"{count} descriptions updated for {model.__name__}")
        
    except Exception as e:
        print(f"Error processing {model.__name__}: {e}")

if __name__ == "__main__":
    update_descriptions()