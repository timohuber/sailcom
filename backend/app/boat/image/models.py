from django.db import models

from ..models import Boat


class Image(models.Model):
    image = models.ImageField(upload_to='boat_images', blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    boat = models.ForeignKey(to=Boat, related_name='images', on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return f'ID{self.id}: {self.image}'
