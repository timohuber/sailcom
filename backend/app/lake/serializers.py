from rest_framework import serializers

from .models import Lake


class LakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lake
        exclude = ()
