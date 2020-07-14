from rest_framework import serializers

from .boat_document.serializers import DocumentSerializer
from .image.serializers import ImageSerializer
from .models import Boat
from ..boat_crew.serializers import BoatCrewSerializer
from ..booking.serializers import BookingSerializer


class DetailBoatSerializer(serializers.ModelSerializer):
    crew = BoatCrewSerializer(read_only=True)
    images = ImageSerializer(read_only=True, many=True)
    boat_documents = DocumentSerializer(read_only=True, many=True)
    bookings = BookingSerializer(read_only=True, many=True)

    class Meta:
        model = Boat
        fields = ['id', 'title', 'price_weekday', 'price_weekend', 'price_full_day', 'description',
                  'a_license_required', 'length', 'width', 'draught', 'max_crew', 'recommended_crew', 'mooring',
                  'model', 'crew', 'images', 'boat_documents', 'bookings']
