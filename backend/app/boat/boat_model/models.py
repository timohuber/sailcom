from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class BoatModel(models.Model):
    type_name = models.CharField(max_length=100)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return f'ID{self.id}: {self.type_name}'
