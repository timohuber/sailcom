from rest_framework import serializers

from .models import Booking


class BoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['__all__']
