from django.db import models

from ..boat_crew.models import BoatCrew
from .boat_model.models import BoatModel
from ..mooring.models import Mooring


class Boat(models.Model):
    title = models.CharField(max_length=100)
    price_hour_weekday = models.DecimalField(max_digits=19, decimal_places=10)
    price_hour_weekend = models.DecimalField(max_digits=19, decimal_places=10)
    price_fullday_weekday = models.DecimalField(max_digits=19, decimal_places=10)
    price_fullday_weekend = models.DecimalField(max_digits=19, decimal_places=10)
    description = models.CharField(max_length=3000)
    detail_description = models.CharField(max_length=3000, null=True)
    technical_description = models.CharField(max_length=3000, null=True)
    a_license_required = models.BooleanField()
    length = models.IntegerField()
    width = models.IntegerField()
    draught = models.IntegerField()
    max_crew = models.IntegerField()
    recommended_crew = models.IntegerField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    mooring = models.ForeignKey(to=Mooring, related_name='boat', on_delete=models.SET_NULL, blank=True, null=True)
    model = models.ForeignKey(to=BoatModel, related_name='boats', on_delete=models.SET_NULL, blank=True, null=True)
    crew = models.ForeignKey(to=BoatCrew, related_name='boat', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.title
