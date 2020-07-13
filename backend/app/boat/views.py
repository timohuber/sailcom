from django.shortcuts import render
from rest_framework.generics import ListAPIView

from .models import Boat
from .serializers import BoatSerializer


class ListBoatsView(ListAPIView):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer
