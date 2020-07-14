from django.db import models


class BoatCategory(models.Model):
    category_name = models.CharField(max_length=200, null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return f'{self.id}: {self.category_name}'
