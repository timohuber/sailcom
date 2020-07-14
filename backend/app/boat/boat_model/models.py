from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class BoatModel(models.Model):
    type_name = models.CharField(max_length=100)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    users = models.ManyToManyField(to=User, related_name='instructed_for_models', blank=True)

    def __str__(self):
        return self.type_name
