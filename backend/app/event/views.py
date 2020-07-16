from django.http import HttpResponse
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, ListCreateAPIView

from .models import Event
from .serializers import EventSerializer

from datetime import datetime

from ..boat.boat_model.models import BoatModel
from ..boat.models import Boat


class ListEventsAllView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class ListEventsView(ListCreateAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.filter(from_date_time__gte=datetime.now())

    def perform_create(self, serializer):
        br = 'br'
        serializer.save(instructor=self.request.user,
                        boat_model=BoatModel.objects.get(id=Boat.objects.get(id=self.request.data['boat']).model.id))
        return HttpResponse('New event created', status=200)


class ListEventView(RetrieveUpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
