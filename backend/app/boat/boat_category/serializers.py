from rest_framework import serializers

from .models import BoatCategory


class BoatCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatCategory
        fields = ['id', 'category_name', 'created', 'updated']
