from django.contrib.auth import get_user_model
from django.db import models

from ..invoice.models import Invoice

User = get_user_model()


class Transaction(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    sent = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=19, decimal_places=10)

    invoice = models.ForeignKey(to=Invoice, related_name='transactions', blank=True
                                , on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(to=User, related_name='transactions', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.type_name
