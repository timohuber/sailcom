from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from ..boat.models import Boat
from ..event.models import Event
from ..mail.models import Mail
from ..transaction.models import Transaction

User = get_user_model()


class Booking(models.Model):
    from_date_time = models.DateTimeField()
    until_date_time = models.DateTimeField()

    # remove blank and null? => delete db ;P
    created = models.DateField(auto_now_add=True, blank=True, null=True)
    updated = models.DateField(auto_now=True, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    duration_weekday = models.DurationField(blank=True, null=True)
    duration_weekend = models.DurationField(blank=True, null=True)
    weekday_days = models.IntegerField(blank=True, null=True)
    weekend_days = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey(to=User, related_name='bookings', on_delete=models.SET_NULL, null=True)
    boat = models.ForeignKey(to=Boat, related_name='bookings', on_delete=models.SET_NULL, null=True)
    event = models.OneToOneField(to=Event, related_name='bookings', on_delete=models.SET_NULL,
                                 blank=True, null=True)
    transaction = models.OneToOneField(to=Transaction, related_name='booking', on_delete=models.SET_NULL,
                                       blank=True, null=True)

    def __str__(self):
        return f'ID{self.id}: from {self.from_date_time} to: {self.until_date_time}'


@receiver(post_save, sender=Booking)
def send_email(sender, instance, **kwargs):
    email = Mail(recipient=instance.user.email,
                 subject='Buchungsbestätigung sailcom.ch',
                 content=f'Boot: {instance.boat.id}')
    email.save()


@receiver(post_save, sender=Booking)
def create_trans(sender, instance, created, **kwargs):
    if instance.weekday_days is not None:
        if instance.weekday_days + instance.weekend_days == 0:  # hourly rate calculation
            if instance.from_date_time.date().isoweekday() < 6:  # 1-5 Mon-Fri
                price = float(Boat.objects.get(id=instance.boat.id).price_hour_weekday) * float(
                    instance.duration.seconds / 60 / 60)
            else:
                price = float(Boat.objects.get(id=instance.boat.id).price_hour_weekend) * float(
                    instance.duration.seconds / 60 / 60)
        else:  # daily rate calculation
            price = instance.weekday_days * float(Boat.objects.get(id=instance.boat.id).price_fullday_weekday) \
                    + instance.weekend_days * float(Boat.objects.get(id=instance.boat.id).price_fullday_weekend)
        trx = Transaction.objects.create(sent=False, price=price, user=instance.user)
        Booking.objects.filter(id=instance.id).update(transaction=trx)


@receiver(post_save, sender=Event)
def create_booking(sender, instance, created, **kwargs):
    if not Booking.objects.filter(event=instance.id):
        Booking.objects.create(from_date_time=instance.from_date_time, until_date_time=instance.until_date_time,
                               event=instance, user=instance.instructor,
                               duration=instance.until_date_time - instance.from_date_time, boat=instance.boat)
