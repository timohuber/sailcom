from rest_framework import serializers

from .models import Booking
from ..boat.serializers import BoatSerializer
from ..user.serializers import UserSerializer
from ..event.serializers import EventSerializer


class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    boat = BoatSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'boat', 'from_date_time', 'until_date_time', 'duration']

    def perform_create(self, validated_data):
        instance = Booking.objects.create(
            **validated_data
        )
        return instance


class BookingInBoatSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'from_date_time', 'until_date_time', 'duration', 'transaction']


class CreateBookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'boat', 'from_date_time', 'until_date_time', 'duration', 'transaction']

    def perform_create(self, validated_data):
        instance = Booking.objects.create(
            **validated_data
        )
        return instance


class BookingInTransactionSerializer(serializers.ModelSerializer):
    boat = BoatSerializer(read_only=True)
    event = EventSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'boat', 'event', 'from_date_time', 'until_date_time', 'duration', 'transaction']


class NumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id',)
