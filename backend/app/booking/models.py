from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from datetime import timedelta

from .calculation import calculate_price
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
    event = models.OneToOneField(to=Event, related_name='bookings', on_delete=models.CASCADE,
                                 blank=True, null=True)
    transaction = models.OneToOneField(to=Transaction, related_name='booking', on_delete=models.CASCADE,
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
    if instance.transaction is None:
        price = calculate_price(instance.weekday_days, instance.weekend_days, instance.from_date_time,
                                instance.duration, instance.boat.id)
        trx = Transaction.objects.create(sent=False, price=price, user=instance.user)
        Booking.objects.filter(id=instance.id).update(transaction=trx)


@receiver(post_save, sender=Event)
def create_booking(sender, instance, created, **kwargs):
    searchBooking = Booking.objects.filter(boat=instance.boat, from_date_time=instance.from_date_time,
                                           until_date_time=instance.until_date_time)
    if not len(searchBooking) > 0:

        until_date_time = instance.until_date_time.date()
        from_date_time = instance.from_date_time.date()

        duration = until_date_time - from_date_time
        less_24 = duration.days == 0

        dt_start = from_date_time
        dt_end = until_date_time
        dt_current = dt_start
        weekday_count = 0
        weekend_count = 0

        # loop through days to count weekend days and weekdays
        if not less_24:
            while dt_current <= dt_end:
                if dt_current.isoweekday() > 5:
                    weekend_count += 1
                else:
                    weekday_count += 1
                dt_current = dt_current + timedelta(1)  # add 1 day to current day

        Booking.objects.create(from_date_time=instance.from_date_time, until_date_time=instance.until_date_time,
                               event=instance, user=instance.instructor,
                               duration=instance.until_date_time - instance.from_date_time, boat=instance.boat,
                               weekday_days=weekday_count, weekend_days=weekend_count
                               )
    else:
        searchBooking[0].event = instance
        searchBooking[0].save()


@receiver(post_delete, sender=Booking)
def delete_transaction_booking(sender, instance, *args, **kwargs):
    if instance.transaction:
        instance.transaction.delete()
    if len(Event.objects.filter(id=instance.event_id)) > 0:
        Event.objects.get(id=instance.event_id).delete()
