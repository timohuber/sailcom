from django.contrib.auth import get_user_model
from rest_framework import serializers

from app.boat.boat_document.models import BoatDocument


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatDocument
        exclude = ()
