from django.shortcuts import render
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

    def get_queryset(self):
        current_crews = BoatCrew.objects.filter(members=self.request.user)
        return Boat.objects.filter(crew__in=current_crews)


