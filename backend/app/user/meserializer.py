from django.contrib.auth import get_user_model
from rest_framework import serializers

from app.boat.boat_model.serializers import BoatModelSerializer
from app.booking.serializers import BookingSerializer

User = get_user_model()


class MeSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(read_only=True, many=True)
    instructed_for_models = BoatModelSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'bookings', 'instructed_for_models']
