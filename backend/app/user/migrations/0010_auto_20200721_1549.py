# Generated by Django 3.0.7 on 2020-07-21 13:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_user_membership_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='requested_membership',
            new_name='is_member',
        ),
    ]