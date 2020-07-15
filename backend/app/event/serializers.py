from rest_framework import serializers

from .models import Event
from ..user.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True, many=True)
    class Meta:
        model = Event
        fields = ['id', 'title', 'price', 'created', 'updated',
                  'from_date_time', 'until_date_time', 'meeting_point',
                  'boat_model', 'event_type', 'instructor', 'participants']
