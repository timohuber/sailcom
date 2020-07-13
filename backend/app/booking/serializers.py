from rest_framework import serializers

from .models import Booking
from ..mail.models import Mail


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'boat', 'from_date_time', 'until_date_time']

    def save(self, request, **validated_data):
        current_request = getattr(self.context, 'request', None)
        test = 1
        user = 1
        new_booking = Booking(
            user=user,
            **request
        )
        new_booking.save()

        email = Mail(recipient=user.email,
                     subject='Buchungsbestätigung',
                     content=f'Das Boot ist für Sie reserviert.')
        email.save()

        return new_booking
