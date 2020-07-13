from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


class User(AbstractUser):
    # Field user for authentication in Django admin
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (by default USERNAME_FIELD and passwords)
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone = models.CharField(max_length=30, blank=True, null=True)
    joined = models.DateField(auto_now_add=True)
    avatar = models.ImageField(upload_to='profile', blank=True, null=True)

    objects = CustomUserManager()

    def __str__(self):
        return self.email
