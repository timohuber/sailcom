from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()


class BoatCrew(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    members = models.ManyToManyField(to=User, related_name='member_of_boat_crew', blank=True)

    def __str__(self):
        return f'ID{self.id}: {self.title}'
