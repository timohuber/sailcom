from django.contrib.auth import get_user_model
from django.db import models

from ..event.models import Event
from ..invoice.models import Invoice

User = get_user_model()


class Transaction(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    sent = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    membership_fee = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    invoice = models.ForeignKey(to=Invoice, related_name='transactions', blank=True,
                                on_delete=models.SET_NULL, null=True)
    event = models.ForeignKey(to=Event, related_name='transactions', blank=True,
                              on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(to=User, related_name='transactions', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'ID{self.id}: {self.created} {self.user}'
