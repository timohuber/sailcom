from rest_framework.generics import ListAPIView

from .models import  Event
from .serializers import BoatCrewSerializer


class ListBoatCrewView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = BoatCrewSerializer