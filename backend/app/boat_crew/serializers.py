from rest_framework import serializers

from .models import BoatCrew
from ..user.serializers import UserSerializer


class BoatCrewSerializer(serializers.ModelSerializer):
    member = UserSerializer(read_only=True, many=True)

    class Meta:
        model = BoatCrew
        fields = ['id', 'created', 'updated', 'member']