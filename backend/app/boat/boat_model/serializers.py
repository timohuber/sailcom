from rest_framework import serializers

from .models import BoatModel


class BoatModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatModel
        fields = ['id', 'type_name', 'created', 'updated']
