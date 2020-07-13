from django.shortcuts import render
from rest_framework.generics import ListAPIView

from app.boat.models import Boat
from app.boat.serializers import BoatSerializer


class ListBoatsView(ListAPIView):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer
