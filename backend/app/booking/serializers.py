from rest_framework import serializers
from datetime import datetime

from .models import Booking

"""
def timedelta_is_free(email):
    try:
        User.objects.get(email=email)
        return email
    except User.DoesNotExist:
        raise ValidationError(message='User does not exist!')
"""


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'boat', 'from_date_time', 'until_date_time', 'duration']

    def perform_create(self, validated_data):
        instance = Booking.objects.create(
            **validated_data
        )
        return instance


class RetrieveBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'boat', 'from_date_time', 'until_date_time']
