from datetime import timedelta

from django.db.models import Q
from django.http import HttpResponse
from django.utils import timezone
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, ListCreateAPIView, CreateAPIView

from .models import Event
from .serializers import EventSerializer

from ..boat.boat_model.models import BoatModel
from ..boat.models import Boat
from ..permissions import IsLoggedIn
from ..transaction.models import Transaction


class ListEventsAllView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class ListEventsView(ListCreateAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        data = Event.objects.filter(from_date_time__gte=timezone.localtime()-timedelta(days=1))
        if self.request.query_params.get('category') is not None:
            data = data.filter(Q(boat__category=self.request.query_params.get('category')))
        if self.request.query_params.get('lake') is not None:
            data = data.filter(Q(boat__mooring__lake=self.request.query_params.get('lake')))
        if self.request.query_params.get('boat') is not None:
            data = data.filter(Q(boat=self.request.query_params.get('boat')))
        return data


    def post(self, request, *args, **kwargs):
        overlapping_bookings = Boat.objects.filter(id=self.request.data['boat']).filter(
            (Q(bookings__from_date_time__lte=self.request.data['from_date_time'])
             & Q(bookings__until_date_time__gte=self.request.data['from_date_time']))
            |
            (Q(bookings__from_date_time__lte=self.request.data['until_date_time'])
             & Q(bookings__until_date_time__gte=self.request.data['until_date_time']))
            |
            (Q(bookings__from_date_time__gte=self.request.data['from_date_time'])
             & Q(bookings__from_date_time__lte=self.request.data['until_date_time']))
            |
            (Q(bookings__until_date_time__gte=self.request.data['from_date_time'])
             & Q(bookings__until_date_time__lte=self.request.data['until_date_time']))

        )
        if len(overlapping_bookings) > 0:
            return HttpResponse('Das Boot ist leider schon besetzt', status=400)
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user,
                        boat_model=BoatModel.objects.get(id=Boat.objects.get(id=self.request.data['boat']).model.id))
        return HttpResponse('Neue Veranstaltung wurde erstellt', status=200)


class ListEventView(RetrieveUpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class RegisterEventView(CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsLoggedIn]

    def post(self, request, *args, **kwargs):
        currentUser = self.request.user
        searchEvent = Event.objects.get(id=kwargs['pk'])
        registered = Event.objects.filter(id=kwargs['pk'], participants=currentUser)

        if not registered:
            if searchEvent.participants.count() >= searchEvent.max_participants:
                return HttpResponse('Leider ist diese Veranstaltung schon voll', status=400)
            searchEvent.participants.add(currentUser)
            Transaction.objects.create(price=searchEvent.price, user=currentUser, event=searchEvent)
            return HttpResponse('Danke für die Registrierung', status=200)
        else:
            Transaction.objects.get(user=currentUser, event=searchEvent).delete()
            searchEvent.participants.remove(currentUser)
            return HttpResponse('Schade! Sie haben sich für diese Veranstaltung abgemeldet', status=200)
