from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .detailserializer import DetailBoatSerializer
from .models import Boat
from .serializers import BoatSerializer
from ..boat_crew.models import BoatCrew


class ListBoatsView(ListAPIView):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer


class ListBoatView(RetrieveAPIView):
    queryset = Boat.objects.all()
    serializer_class = DetailBoatSerializer


class ListBoatsWhereCrewView(ListAPIView):
    serializer_class = DetailBoatSerializer
    pagination_class = None

    def get_queryset(self):
        current_crews = BoatCrew.objects.filter(members=self.request.user)
        return Boat.objects.filter(crew__in=current_crews)


class SearchBoatsView(ListAPIView):
    serializer_class = BoatSerializer

    def get_queryset(self, *args, **kwargs):
        if self.request.data.get('from_date_time') is not None and self.request.data.get('until_date_time') is not None:
            boats = Boat.objects.exclude(
                Q(status_sharing=False) |
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
        else:
            boats = Boat.objects.filter(status_sharing=True)
        if self.request.data.get('lake') is not None and self.request.data.get('model') is not None:
            return boats.filter(mooring__lake=self.request.data['lake'],
                                model=self.request.data['model'])
        if self.request.data.get('lake') is not None:
            return boats.filter(mooring__lake=self.request.data['lake'])
        if self.request.data.get('model') is not None:
            return boats.filter(mooring__lake=self.request.data['model'])
