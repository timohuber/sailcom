# Generated by Django 3.0.7 on 2020-07-13 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20200713_1358'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='zip',
        ),
        migrations.AddField(
            model_name='user',
            name='zip_code',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
