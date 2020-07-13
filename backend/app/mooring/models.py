from django.db import models

from app.lake.models import Lake


class Mooring(models.Model):
    address = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    lake = models.ForeignKey(to=Lake, related_name='images', on_delete=models.CASCADE, blank=True)
