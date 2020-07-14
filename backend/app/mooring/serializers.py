from rest_framework import serializers

from .models import Mooring
from ..lake.serializers import LakeSerializer


class MooringSerializer(serializers.ModelSerializer):
    lake = LakeSerializer(read_only=True)

    class Meta:
        model = Mooring
        fields = ['address', 'lake', 'latitude', 'longitude']