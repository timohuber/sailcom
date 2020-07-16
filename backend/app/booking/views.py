from django.db.models import Q
from django.http import HttpResponse
from rest_framework.generics import ListCreateAPIView, GenericAPIView

from datetime import timedelta

from .models import Booking
from .serializers import BookingSerializer, CreateBookingSerializer
from ..permissions import IsLoggedIn

from ..mail.models import Mail


class ListCreateBookingsView(ListCreateAPIView):
    queryset = Booking.objects.all()
    permission_classes = [IsLoggedIn]

    def get_serializer_class(self):
        if self.request==None: #for API documentation
            return BookingSerializer
        elif self.request.method == 'POST': #for creating bookings
            return CreateBookingSerializer
        return BookingSerializer

    def post(self, request, *args, **kwargs):
        until_date_time = request.data.get('until_date_time')
        from_date_time = request.data.get('from_date_time')

        if from_date_time >= until_date_time:
            res = {
                "Buchungsende ist nicht nach Buchungsanfang"
            }
            return HttpResponse(res, status=400)
        if self.request.data.get('boat') == None:
            res = {
                "Bitte Boot auswählen"
            }
            return HttpResponse(res, status=400)
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
        duration = until_date_time - from_date_time

        sameday = until_date_time.date() == from_date_time.date()
        weekday = from_date_time.date().isoweekday() < 6
        less_24 = duration.days == 0
        less_five = float(duration.seconds/60/60) < 5

        dt_start = serializer.validated_data.get('from_date_time').date()
        dt_end = serializer.validated_data.get('until_date_time').date()
        dt_current = dt_start
        weekday_count = 0
        weekend_count = 0
        duration_weekday = 0
        duration_weekend = 0

        # loop through days to count weekend days and weekdays
        if not less_24:
            while dt_current <= dt_end:
                if dt_current.isoweekday() > 5:
                    weekend_count += 1
                else:
                    weekday_count += 1
                dt_current = dt_current+timedelta(1)  # add 1 day to current day


        serializer.save(
            user=self.request.user,
            duration=duration,
            weekday_days=weekday_count,
            weekend_days=weekend_count
        )
