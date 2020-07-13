from rest_framework import serializers

from app.boat.models import Boat


class BoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boat
        fields = ['__all__']
