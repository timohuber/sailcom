# Generated by Django 3.0.7 on 2020-07-20 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boat', '0005_auto_20200720_0713'),
    ]

    operations = [
        migrations.AddField(
            model_name='boat',
            name='registration_number',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
