from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .detailserializer import DetailBoatSerializer
from .models import Boat
from .serializers import BoatSerializer


class ListBoatsView(ListAPIView):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer


class ListBoatView(RetrieveAPIView):
    queryset = Boat.objects.all()
    serializer_class = DetailBoatSerializer

