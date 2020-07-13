from django.db import models

from app.boat_crew.models import BoatCrew
from app.boat_type.models import BoatType
from app.mooring.models import Mooring


class Boat(models.Model):
    title = models.CharField(max_length=100)
    price_weekday = models.DecimalField(max_digits=10, decimal_places=10)
    price_weekend = models.DecimalField(max_digits=10, decimal_places=10)
    price_full_day = models.DecimalField(max_digits=10, decimal_places=10)
    description = models.CharField(max_length=600)
    a_license_required = models.BooleanField()
    length = models.IntegerField()
    width = models.IntegerField()
    draught = models.IntegerField()
    max_crew = models.IntegerField()
    recommended_crew = models.IntegerField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    mooring = models.ForeignKey(to=Mooring, related_name='boat', on_delete=models.CASCADE, blank=True)
    type = models.ForeignKey(to=BoatType, related_name='boat', on_delete=models.CASCADE, blank=True)
    crew = models.OneToOneField(to=BoatCrew, related_name='boat', on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.title
