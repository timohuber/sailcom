# Generated by Django 3.0.7 on 2020-07-17 07:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0006_remove_transaction_booking'),
        ('booking', '0008_remove_booking_transaction'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='transaction',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='booking', to='transaction.Transaction'),
        ),
    ]
