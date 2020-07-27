# Generated by Django 3.0.7 on 2020-07-27 11:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0010_auto_20200727_0920'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('transaction', '0010_transaction_membership_fee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='event',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='event.Event'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to=settings.AUTH_USER_MODEL),
        ),
    ]
