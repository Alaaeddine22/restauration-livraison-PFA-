
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_savedcarts'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'Category', 'verbose_name_plural': 'Categories'},
        ),
        migrations.AlterModelOptions(
            name='dinnerplatters',
            options={'verbose_name': 'List of Diner Platters', 'verbose_name_plural': 'List of Diner Platters'},
        ),
        migrations.AlterModelOptions(
            name='pasta',
            options={'verbose_name': 'List of Pasta', 'verbose_name_plural': 'List of Pasta'},
        ),
        migrations.AlterModelOptions(
            name='regularpizza',
            options={'verbose_name': 'List of Regular Pizza', 'verbose_name_plural': 'List of Regular Pizza'},
        ),
        migrations.AlterModelOptions(
            name='salad',
            options={'verbose_name': 'List of Salad', 'verbose_name_plural': 'List of Salad'},
        ),
        migrations.AlterModelOptions(
            name='savedcarts',
            options={'verbose_name': 'Saved Users Cart', 'verbose_name_plural': 'Saved Users Cart'},
        ),
        migrations.AlterModelOptions(
            name='sicilianpizza',
            options={'verbose_name': 'List of Sicilian Pizza', 'verbose_name_plural': 'List of Sicilian Pizza'},
        ),
        migrations.AlterModelOptions(
            name='sub',
            options={'verbose_name': 'List of Subway Food', 'verbose_name_plural': 'List of Subway Food'},
        ),
        migrations.AlterModelOptions(
            name='toppings',
            options={'verbose_name': 'List of Pizza Toppings', 'verbose_name_plural': 'List of Pizza Toppings'},
        ),
        migrations.AlterModelOptions(
            name='userorder',
            options={'verbose_name': 'User Order List', 'verbose_name_plural': 'User Order List'},
        ),
        migrations.AlterField(
            model_name='category',
            name='category_gif',
            field=models.ImageField(upload_to='media'),
        ),
    ]
