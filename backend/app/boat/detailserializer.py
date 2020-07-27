from rest_framework import serializers

from .boat_category.serializers import BoatCategorySerializer
from .boat_document.serializers import DocumentSerializer
from .image.serializers import ImageSerializer
from .models import Boat
from ..boat_crew.serializers import BoatCrewSerializer
from ..booking.serializers import BookingInBoatSerializer
from ..mooring.serializers import MooringSerializer


class DetailBoatSerializer(serializers.ModelSerializer):
    crew = BoatCrewSerializer(read_only=True)
    images = ImageSerializer(read_only=True, many=True)
    boat_documents = DocumentSerializer(read_only=True, many=True)
    bookings = BookingInBoatSerializer(read_only=True, many=True)
    mooring = MooringSerializer(read_only=True)
    category = BoatCategorySerializer(read_only=True)

    class Meta:
        model = Boat
        fields = ['id', 'title', 'owner', 'price_hour_weekday', 'price_hour_weekend', 'price_fullday_weekday',
                  'price_fullday_weekend', 'description', 'detail_description', 'technical_description',
                  'a_license_required', 'length', 'width', 'draught', 'max_crew', 'recommended_crew', 'mooring',
                  'model', 'crew', 'images', 'boat_documents', 'bookings', 'registration_number', 'status_sharing',
                  'category']
