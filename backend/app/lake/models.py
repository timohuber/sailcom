from django.db import models

class Lake(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
