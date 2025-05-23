
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_dinnerplatters_pasta_regularpizza_salad_sicilianpizza_sub_toppings'),
    ]

    operations = [
        migrations.AddField(
            model_name='regularpizza',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='orders.Category', verbose_name='Dish Category'),
        ),
        migrations.AddField(
            model_name='sicilianpizza',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='orders.Category', verbose_name='Dish Category'),
        ),
    ]
