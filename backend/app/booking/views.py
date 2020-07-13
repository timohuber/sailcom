from django.shortcuts import render
from requests import Response
from rest_framework.generics import ListCreateAPIView

from .models import Booking
from .serializers import BookingSerializer
from ..permissions import IsLoggedIn


class ListCreateBookingsView(ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsLoggedIn]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response(serializer.data)
