from django.db import models

from app.boat.models import Boat


class BoatDocument(models.Model):
    type = models.CharField(max_length=20)
    document = models.ImageField(upload_to='boat_documents', blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    boat = models.ForeignKey(to=Boat, related_name='boat_documents', on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.document
