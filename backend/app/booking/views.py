from django.db.models import Q
from django.http import HttpResponse
from rest_framework.generics import ListCreateAPIView, GenericAPIView

from .models import Booking
from .serializers import BookingSerializer
from ..permissions import IsLoggedIn

from ..mail.models import Mail


class ListCreateBookingsView(ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsLoggedIn]

    def post(self, request, *args, **kwargs):
        until_date_time = request.data.get('until_date_time')
        from_date_time = request.data.get('from_date_time')

        if from_date_time > until_date_time:
            res = {
                "Buchungsanfang ist nach Buchungsende"
            }
            return HttpResponse(res, status=400)

        existing_bookings = Booking.objects.filter((
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

        serializer.save(
            user=self.request.user,
            duration=duration
        )

        # send confirmation email => post save signal
        email = Mail(recipient=self.request.user.email,
                     subject='Buchungsbestätigung sailcom.ch',
                     content=f'Boot: {serializer.data.get("boat")}')
        email.save()
