from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


class User(AbstractUser):
    # Field user for authentication in Django admin
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (by default USERNAME_FIELD and passwords)
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    street = models.CharField(max_length=200, blank=True, null=True)
    address_appendix = models.CharField(max_length=200, blank=True, null=True);
    city = models.CharField(max_length=200, blank=True, null=True)
    zip = models.IntegerField(max_length=200, blank=True, null=True)

    phone = models.CharField(max_length=200, blank=True, null=True)
    mobile = models.CharField(max_length=200, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    joined = models.DateField(auto_now_add=True)
    avatar = models.ImageField(upload_to='profile', blank=True, null=True)

    licence_ok = models.BooleanField(default=False)
    entry_fee_paid = models.BooleanField(default=False)

    objects = CustomUserManager()

    def __str__(self):
        return self.email
