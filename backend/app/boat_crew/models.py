from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()


class BoatCrew(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    member = models.ManyToManyField(to=User, related_name='boatcrew', blank=True)
