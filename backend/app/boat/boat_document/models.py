from django.db import models

from ..models import Boat


class BoatDocument(models.Model):
    type = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    document = models.FileField(upload_to='boat_documents', blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    boat = models.ForeignKey(to=Boat, related_name='boat_documents', on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return f'ID{self.id}: Type: {self.type}, Name: {self.name}, Document: {self.document}'
