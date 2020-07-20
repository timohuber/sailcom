from datetime import timedelta
from django.utils import timezone
from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .detailserializer import DetailBoatSerializer
from .models import Boat
from .serializers import BoatSerializer
from ..boat_crew.models import BoatCrew


class ListBoatsView(ListAPIView):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer

    def get_queryset(self, *args, **kwargs):
        # filter for date if provided and exclude where sharing status is false
        if self.request.query_params.get('from_date_time') is not None and self.request.query_params.get('until_date_time') is not None:
            data = Boat.objects.exclude(
                Q(status_sharing=False) |
                (Q(bookings__from_date_time__lte=self.request.query_params['from_date_time'])
                 & Q(bookings__until_date_time__gte=self.request.query_params['from_date_time']))
                |
                (Q(bookings__from_date_time__lte=self.request.query_params['until_date_time'])
                 & Q(bookings__until_date_time__gte=self.request.query_params['until_date_time']))
                |
                (Q(bookings__from_date_time__gte=self.request.query_params['from_date_time'])
                 & Q(bookings__from_date_time__lte=self.request.query_params['until_date_time']))
                |
                (Q(bookings__until_date_time__gte=self.request.query_params['from_date_time'])
                 & Q(bookings__until_date_time__lte=self.request.query_params['until_date_time']))
            )
        else:
            data = Boat.objects.filter(status_sharing=True)

        # filter for lake and category
        if self.request.query_params.get('lake') is not None and self.request.query_params.get('category') is not None:
            data = data.filter(mooring__lake=self.request.query_params['lake'],
                               category=self.request.query_params['category'])
        if self.request.query_params.get('lake') is not None:
            data = data.filter(mooring__lake=self.request.query_params['lake'])
        if self.request.query_params.get('category') is not None:
            data = data.filter(category=self.request.query_params['category'])
        if self.request.query_params.get('instructed') is not None:

            # filter for is instructed
            if self.request.query_params.get('instructed'):
                return data.filter(model__in=self.request.user.instructed_for_models.all())
            if not self.request.query_params.get('instructed'):
                return data.exclude(model__in=self.request.user.instructed_for_models.all())
        return data

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
        # filter for date if provided and exclude where sharing status is false
        if self.request.data.get('from_date_time') is not None and self.request.data.get('until_date_time') is not None:
            data = Boat.objects.exclude(
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
            data = Boat.objects.filter(status_sharing=True)

        # filter for lake and category
        if self.request.data.get('lake') is not None and self.request.data.get('category') is not None:
            data = data.filter(mooring__lake=self.request.data['lake'],
                               category=self.request.data['category'])
        if self.request.data.get('lake') is not None:
            data = data.filter(mooring__lake=self.request.data['lake'])
        if self.request.data.get('category') is not None:
            data = data.filter(category=self.request.data['category'])
        if self.request.data.get('instructed') is not None:

            # filter for is instructed
            if self.request.data.get('instructed'):
                return data.filter(model__in=self.request.user.instructed_for_models.all())
            if not self.request.data.get('instructed'):
                return data.exclude(model__in=self.request.user.instructed_for_models.all())
        return data


class FavouriteTodayView(ListAPIView):
    serializer_class = DetailBoatSerializer

    def get_queryset(self):
        timezone.activate('Europe/Berlin')
        from_date_time = timezone.localtime()
        until_date_time = timezone.localtime() + timedelta(hours=2)
        return Boat.objects.filter(mooring__lake=self.request.user.favourite_lake, status_sharing=True).exclude(
            (Q(bookings__from_date_time__lte=from_date_time)
             & Q(bookings__until_date_time__gte=from_date_time))
            |
            (Q(bookings__from_date_time__lte=until_date_time)
             & Q(bookings__until_date_time__gte=until_date_time))
            |
            (Q(bookings__from_date_time__gte=from_date_time)
             & Q(bookings__from_date_time__lte=until_date_time))
            |
            (Q(bookings__until_date_time__gte=from_date_time)
             & Q(bookings__until_date_time__lte=until_date_time))
        )
