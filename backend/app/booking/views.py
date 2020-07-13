from django.db.models import Q
from django.http import HttpResponse
from rest_framework.generics import ListCreateAPIView

from .models import Booking
from .serializers import BookingSerializer
from ..permissions import IsLoggedIn

from ..mail.models import Mail


class ListCreateBookingsView(ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsLoggedIn]

    def perform_create(self, serializer):
        serializer.is_valid()

        # calculate booking duration
        until_date_time = serializer.validated_data.get('until_date_time')
        from_date_time = serializer.validated_data.get('from_date_time')
        duration = until_date_time - from_date_time

        # check if there is a collision
        """
        existing_bookings = Booking.objects.filter(
            Q(until_date_time__range=[from_date_time, from_date_time + duration]) |
            Q(from_date_time__range=[from_date_time, from_date_time + duration]))
        """

        existing_bookings = Booking.objects.filter((
            Q(from_date_time__exact=from_date_time) &
            Q(until_date_time__exact=until_date_time)
        ) | (
            Q(until_date_time__gt=from_date_time) &
            Q(until_date_time__lt=until_date_time)
        ) | (
            Q(from_date_time__gt=until_date_time) &
            Q(from_date_time__lt=from_date_time)
        ))

        # wie diese Query verwenden?

        serializer.save(user=self.request.user,
                        duration=duration)

        # send confirmation email
        email = Mail(recipient=self.request.user.email,
                     subject='Buchungsbestätigung sailcom.ch',
                     content=f'Boot: {serializer.data.get("boat")}')
        email.save()
