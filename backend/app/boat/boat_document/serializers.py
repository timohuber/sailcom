from rest_framework import serializers

from ..boat_document.models import BoatDocument


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatDocument
        exclude = ()
