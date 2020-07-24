from django.contrib.auth import get_user_model
from django.db import models

from ..boat.boat_model.models import BoatModel
from ..boat.models import Boat
from ..event.event_type.models import EventType

User = get_user_model()


class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    from_date_time = models.DateTimeField()
    until_date_time = models.DateTimeField()
    meeting_point = models.CharField(max_length=100)
    max_participants = models.IntegerField()

    boat_model = models.ForeignKey(to=BoatModel, related_name='event', on_delete=models.SET_NULL, blank=True, null=True)
    event_type = models.ForeignKey(to=EventType, related_name='event', on_delete=models.SET_NULL, blank=True, null=True)
    instructor = models.ForeignKey(to=User, related_name='organized_events', on_delete=models.SET_NULL)
    participants = models.ManyToManyField(to=User, related_name='participated_events', blank=True)
    boat = models.ForeignKey(to=Boat, related_name='event', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f'ID{self.id}: {self.title}'
