from django.db.models import Q
from django.http import HttpResponse
from rest_framework.generics import ListCreateAPIView, ListAPIView, DestroyAPIView

from datetime import timedelta, datetime
from django.utils import timezone

from .calculation import calculate_duration, calculate_price
from .models import Booking
from .serializers import BookingSerializer, CreateBookingSerializer
from ..boat.models import Boat
from ..permissions import IsLoggedIn, IsStaffOrCreator, MemberPostLoggedInFetch


class ListCreateBookingsView(ListCreateAPIView):
    queryset = Booking.objects.all().order_by('from_date_time')
    permission_classes = [MemberPostLoggedInFetch]

    def get_serializer_class(self):
        if self.request is None:  # for API documentation
            return BookingSerializer
        elif self.request.method == 'POST':  # for creating bookings
            return CreateBookingSerializer
        return BookingSerializer

    def post(self, request, *args, **kwargs):
        if self.request.data.get('until_date_time') is None or self.request.data.get('from_date_time') is None:
            return HttpResponse('Die Daten von und bis sind nicht vollständig', status=400)
        until_date_time = request.data.get('until_date_time')
        from_date_time = request.data.get('from_date_time')

        if from_date_time >= until_date_time:
            res = {
                "Buchungsende ist nicht nach Buchungsanfang"
            }
            return HttpResponse(res, status=400)
        if self.request.data.get('boat') is None:
            return HttpResponse('Bitte Boot auswählen', status=400)
        existing_bookings = Booking.objects.filter(Q(boat__id__exact=self.request.data.get('boat'))) \
            .filter((
                        Q(from_date_time__exact=from_date_time)
                    ) | (
                            Q(from_date_time__gt=from_date_time) &
                            Q(from_date_time__lt=until_date_time)
                    ) | (
                            Q(from_date_time__lt=from_date_time) &
                            Q(until_date_time__gt=from_date_time)
                    ))
        if len(existing_bookings) > 0:
            res = {
                "Das Boot kann zu dieser Zeit nicht gebucht werden"
            }
            return HttpResponse(res, status=400)
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.is_valid()

        # calculate booking duration
        until_date_time = serializer.validated_data.get('until_date_time')
        from_date_time = serializer.validated_data.get('from_date_time')

        duration_calc = calculate_duration(from_date_time, until_date_time)

        weekday_count = duration_calc['weekday_count']
        weekend_count = duration_calc['weekend_count']
        duration = duration_calc['duration']

        serializer.save(
            user=self.request.user,
            duration=duration,
            weekday_days=weekday_count,
            weekend_days=weekend_count
        )


class CalculateBookingView(ListAPIView):
    serializer_class = BookingSerializer

    def post(self, request, *args, **kwargs):
        if self.request.data.get('from_date_time') is None or self.request.data.get('until_date_time') is None:
            return HttpResponse('Die Daten von und bis sind nicht vollständig', status=400)

        until_date_time = datetime.strptime(request.data.get('until_date_time'), '%Y-%m-%dT%H:%MZ')
        from_date_time = datetime.strptime(request.data.get('from_date_time'), '%Y-%m-%dT%H:%MZ')

        if from_date_time >= until_date_time:
            res = {
                "Buchungsende ist nicht nach Buchungsanfang"
            }
            return HttpResponse(res, status=400)
        if self.request.data.get('boat') is None:
            res = {
                "Bitte Boot auswählen"
            }
            return HttpResponse(res, status=400)

        duration_dates = calculate_duration(from_date_time, until_date_time)

        weekday_count = duration_dates['weekday_count']
        weekend_count = duration_dates['weekend_count']
        duration = duration_dates['weekend_count']

        price = calculate_price(weekday_count, weekend_count, from_date_time, duration, self.request.data.get('boat'))

        return HttpResponse(price, status=200)


class DestroyBookingView(DestroyAPIView):
    queryset = Booking.objects.all()
    permission_classes = [IsStaffOrCreator]


class MyBookingView(ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsLoggedIn]

    def get_queryset(self):
        data = Booking.objects.filter(Q(user=self.request.user))
        if self.request.query_params.get('mitsegeln') is not None and self.request.query_params.get('mitsegeln') \
                == 'true':
            data = data.filter(from_date_time__gte=timezone.localtime() - timedelta(days=1), event__isnull=True)
        return data.order_by('from_date_time')
