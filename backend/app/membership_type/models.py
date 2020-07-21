from django.db import models


class MembershipType(models.Model):
    title = models.CharField(max_length=100)
    membership_fee = models.DecimalField(max_digits=3, decimal_places=2)
    active = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return f'ID{self.id}: {self.title}'
