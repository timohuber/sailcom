# Generated by Django 3.0.7 on 2020-07-16 06:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('boat', '0004_auto_20200715_0751'),
        ('event', '0003_auto_20200715_0751'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='boat',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='event', to='boat.Boat'),
        ),
    ]
