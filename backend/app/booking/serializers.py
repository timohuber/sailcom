from rest_framework import serializers
from django.core.exceptions import ValidationError

from .models import Booking


"""def timedelta_is_free(existing_bookings):
    if existing_bookings > 0:
        raise ValidationError(message='Das Boot kann zu dieser Zeit nicht gebucht werden')"""

"""def timedelta_is_free(from_date_time, until_date_time):
    test = 1
    if from_date_time > 0:
        raise ValidationError(message='Das Boot kann zu dieser Zeit nicht gebucht werden')"""


class BookingSerializer(serializers.ModelSerializer):
    # existing_bookings = serializers.ReadOnlyField(read_only=True, validators=[timedelta_is_free])

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
