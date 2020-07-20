from django.db import models


class Invoice(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    sent = models.BooleanField(default=False)
    closed = models.BooleanField(default=False)

    def __str__(self):
        return f'ID{self.id}: {self.created}, {self.sent}, {self.closed}'
