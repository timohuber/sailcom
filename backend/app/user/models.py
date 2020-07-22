from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager
from ..boat_crew.models import BoatCrew
from ..lake.models import Lake
from ..membership_type.models import MembershipType


class User(AbstractUser):
    # Field user for authentication in Django admin
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (by default USERNAME_FIELD and passwords)
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    salutation = models.CharField(max_length=10, blank=True, null=True, choices=[('Herr', 'Herr'),
                                                                                 ('Frau', 'Frau'), ('Firma', 'Firma')])

    street = models.CharField(max_length=200, blank=True, null=True)
    address_appendix = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=200, blank=True, null=True)
    country = models.CharField(max_length=200, blank=True, null=True)
    zip_code = models.CharField(max_length=200, blank=True, null=True)

    phone = models.CharField(max_length=200, blank=True, null=True)
    mobile = models.CharField(max_length=200, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    licence = models.FileField(upload_to='licences', blank=True, null=True)
    joined = models.DateField(auto_now_add=True)
    avatar = models.ImageField(upload_to='profile', blank=True, null=True)

    licence_ok = models.BooleanField(default=False)
    entry_fee_paid = models.BooleanField(default=False)
    is_member = models.BooleanField(default=False)
    request_membership = models.BooleanField(default=False)
    membership_type = models.ForeignKey(to=MembershipType, related_name='users', on_delete=models.SET_NULL,
                                        blank=True, null=True)

    objects = CustomUserManager()

    favourite_lake = models.ForeignKey(to=Lake, related_name='top_users', on_delete=models.SET_NULL, blank=True,
                                       null=True)

    @property
    def is_crew(self):
        userCrew = BoatCrew.objects.filter(members=self)
        if len(userCrew) > 0:
            return True
        return False

    def __str__(self):
        return f'ID{self.id}: {self.email}'
