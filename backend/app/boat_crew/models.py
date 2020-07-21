from django.db import models
from django.conf import settings


class BoatCrew(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    members = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='member_of_boat_crew', blank=True)

    def __str__(self):
        return f'ID{self.id}: {self.title}'
