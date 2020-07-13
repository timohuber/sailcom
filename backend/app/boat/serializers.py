from rest_framework import serializers

from .models import Boat


class BoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boat
        fields = ['id', 'title', 'price_weekday', 'price_weekend', 'price_full_day', 'description',
                  'a_license_required', 'length', 'width', 'draught', 'max_crew', 'recommended_crew', 'mooring',
                  'type', 'crew']
