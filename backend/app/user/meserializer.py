from django.contrib.auth import get_user_model
from rest_framework import serializers

from ..booking.serializers import BookingSerializer

User = get_user_model()


class MeSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ['id', 'salutation', 'email', 'first_name', 'last_name', 'street', 'address_appendix', 'city',
                  'country', 'zip_code', 'phone', 'mobile', 'date_of_birth', 'licence', 'joined', 'avatar',
                  'licence_ok', 'entry_fee_paid', 'bookings', 'instructed_for_models', 'favourite_lake', 'is_crew']
        read_only_fields = ['instructed_for_models']
