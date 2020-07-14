from rest_framework import serializers

from .image.serializers import ImageSerializer
from .models import Boat
from ..boat_crew.serializers import BoatCrewSerializer


class BoatSerializer(serializers.ModelSerializer):
    crew = BoatCrewSerializer(read_only=True)
    images = ImageSerializer(read_only=True, many=True)

    class Meta:
        model = Boat
        fields = ['id', 'title', 'price_weekday', 'price_weekend', 'price_full_day', 'description',
                  'a_license_required', 'length', 'width', 'draught', 'max_crew', 'recommended_crew', 'mooring',
                  'model', 'crew', 'images']
