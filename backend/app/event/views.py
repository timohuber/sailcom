from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView

from .models import Event
from .serializers import EventSerializer

from datetime import datetime


class ListEventsAllView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class ListEventsView(ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.filter(from_date_time__gte=datetime.now())


class ListEventView(RetrieveUpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
