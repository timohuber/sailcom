from datetime import timedelta

from django.db.models import Q
from django.http import HttpResponse
from django.utils import timezone
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, ListCreateAPIView, CreateAPIView

from .models import Event
from .serializers import EventSerializer

from ..boat.boat_model.models import BoatModel
from ..boat.models import Boat
from ..booking.models import Booking
from ..mail.models import Mail
from ..permissions import IsLoggedIn, IsMember, MemberPostLoggedInFetch
from ..transaction.models import Transaction


class ListEventsAllView(ListAPIView):
    queryset = Event.objects.all().order_by('from_date_time')
    serializer_class = EventSerializer


class ListEventsView(ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [MemberPostLoggedInFetch]

    def get_queryset(self):
        data = Event.objects.filter(from_date_time__gte=timezone.localtime() - timedelta(days=1))
        if self.request.query_params.get('category') is not None:
            data = data.filter(Q(boat__category=self.request.query_params.get('category')))
        if self.request.query_params.get('lake') is not None:
            data = data.filter(Q(boat__mooring__lake=self.request.query_params.get('lake')))
        if self.request.query_params.get('boat') is not None:
            data = data.filter(Q(boat=self.request.query_params.get('boat')))
        return data.order_by('from_date_time')

    def post(self, request, *args, **kwargs):
        # method 1 where booking is not created already
        if self.request.data.get('boat') is None:
            return HttpResponse('Die Boot Information fehlt', status=400)
        if self.request.data.get('from_date_time') is None or self.request.data.get('until_date_time') is None:
            return HttpResponse('Die Daten von und bis sind nicht vollständig', status=400)
        if self.request.data.get('booking') is None:
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
            # method 2 where booking is given with the event
        else:
            searchEvent = Event.objects.filter(until_date_time=self.request.data['until_date_time'],
                                               from_date_time=self.request.data['from_date_time'],
                                               boat=self.request.data['boat'])
            if len(searchEvent) > 0:
                return HttpResponse('Diesen Event gibt es schon', status=400)
            searchBooking = Booking.objects.filter(id=self.request.data.get('booking'))
            if len(searchBooking) == 0:
                return HttpResponse('Die Buchung wurde nicht gefunden', status=400)
            if searchBooking[0].event is not None:
                return HttpResponse('Die Buchung hat schon ein Event', status=400)
            if not searchBooking[0].boat.id == self.request.data['boat']:
                return HttpResponse('Die Buchung hat ein anderes Boot', status=400)
            if not searchBooking[0].from_date_time.isoformat().replace(':00+00:00', 'Z') == self.request.data[
                'from_date_time'] \
                    or not searchBooking[0].until_date_time.isoformat().replace(':00+00:00', 'Z') == self.request.data[
                'until_date_time']:
                return HttpResponse('Die Daten stimmen mit der Buchung nicht überein', status=400)

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

    def get_permissions(self):
        searchEvent = Event.objects.filter(id=self.kwargs['pk'])
        if searchEvent[0].event_type.is_public:
            return (IsLoggedIn(),)
        else:
            return (IsMember(),)

    def post(self, request, *args, **kwargs):
        if len(Event.objects.filter(id=kwargs['pk'])) == 0:
            return HttpResponse('Veranstaltung existiert nicht', status=500)
        currentUser = self.request.user
        searchEvent = Event.objects.get(id=kwargs['pk'])
        registered = Event.objects.filter(id=kwargs['pk'], participants=currentUser)

        if not registered:
            if searchEvent.participants.count() >= searchEvent.max_participants:
                return HttpResponse('Leider ist diese Veranstaltung schon voll', status=400)
            searchEvent.participants.add(currentUser)
            Transaction.objects.create(price=searchEvent.price, user=currentUser, event=searchEvent)
            email = Mail(recipient=searchEvent.instructor.email,
                         subject=f'Neue Registrierung für Veranstaltung {searchEvent.title}',
                         content=f'{currentUser.first_name} {currentUser.last_name} hat sich für {searchEvent.title}'
                                 f'registriert')
            email.save()
            return HttpResponse('Danke für die Registrierung', status=200)
        else:
            Transaction.objects.get(user=currentUser, event=searchEvent).delete()
            searchEvent.participants.remove(currentUser)
            Transaction.objects.create(price=searchEvent.price, user=currentUser, event=searchEvent)
            email = Mail(recipient=searchEvent.instructor.email,
                         subject=f'Abmeldung für Veranstaltung {searchEvent.title}',
                         content=f'{currentUser.first_name} {currentUser.last_name} hat sich für {searchEvent.title}'
                                 f'abgemeldet')
            email.save()
            return HttpResponse('Schade! Sie haben sich für diese Veranstaltung abgemeldet', status=200)
