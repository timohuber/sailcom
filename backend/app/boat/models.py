from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from .boat_category.models import BoatCategory
from ..boat_crew.models import BoatCrew
from .boat_model.models import BoatModel
from ..mooring.models import Mooring

User = get_user_model()


class Boat(models.Model):
    title = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=20, null=True)
    price_hour_weekday = models.DecimalField(max_digits=10, decimal_places=2)
    price_hour_weekend = models.DecimalField(max_digits=10, decimal_places=2)
    price_fullday_weekday = models.DecimalField(max_digits=10, decimal_places=2)
    price_fullday_weekend = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=3000)
    detail_description = models.CharField(max_length=3000, null=True)
    technical_description = models.CharField(max_length=3000, null=True)
    a_license_required = models.BooleanField()
    d_license_required = models.BooleanField()
    status_sharing = models.BooleanField()
    length = models.IntegerField()
    width = models.IntegerField()
    draught = models.IntegerField()
    weight = models.IntegerField()
    balast = models.IntegerField(blank=True, null=True)
    max_crew = models.IntegerField()
    fuel = models.CharField(max_length=50, blank=True, null=True)
    motor_brand = models.CharField(max_length=50, null=True)
    engine_performance_kw = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    engine_performance_ps = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bunks = models.CharField(max_length=50, blank=True, null=True)
    fridge = models.CharField(max_length=50, blank=True, null=True)
    toilet = models.CharField(max_length=50, blank=True, null=True)
    cooking = models.CharField(max_length=50, blank=True, null=True)
    water = models.CharField(max_length=50, blank=True, null=True)
    usb_port = models.CharField(max_length=50, blank=True, null=True)
    port_220 = models.CharField(max_length=50, blank=True, null=True)
    gas_installation = models.CharField(max_length=50, blank=True, null=True)
    recommended_crew = models.IntegerField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    sail_area = models.IntegerField()
    main_sail = models.CharField(max_length=50, blank=True, null=True)
    fore_sail = models.CharField(max_length=50, blank=True, null=True)
    roll_genua = models.BooleanField(blank=True, null=True)
    sturmsegel = models.BooleanField(blank=True, null=True)
    gennacker = models.BooleanField(blank=True, null=True)
    gennacker_area = models.CharField(max_length=50, blank=True, null=True)
    spinacker = models.BooleanField(blank=True, null=True)
    spinacker_area = models.CharField(max_length=50, blank=True, null=True)
    sail_freetext = models.CharField(max_length=500, blank=True, null=True)
    mooring = models.ForeignKey(to=Mooring, related_name='boat', on_delete=models.SET_NULL, blank=True, null=True)
    model = models.ForeignKey(to=BoatModel, related_name='boats', on_delete=models.SET_NULL, blank=True, null=True)
    crew = models.OneToOneField(to=BoatCrew, related_name='boat', on_delete=models.SET_NULL, blank=True, null=True)
    owner = models.ForeignKey(to=User, related_name='owned_boats', on_delete=models.SET_NULL, blank=True, null=True)
    category = models.ForeignKey(to=BoatCategory, related_name='boats', on_delete=models.SET_NULL,
                                 blank=True, null=True)

    def __str__(self):
        return f'ID{self.id}: {self.title}'


@receiver(post_save, sender=Boat)
def create_crew(sender, instance, created, **kwargs):
    if len(BoatCrew.objects.filter(boat=instance)) == 0:
        BoatCrew.objects.create(boat=instance, title=instance.title)
