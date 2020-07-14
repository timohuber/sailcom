from rest_framework.generics import ListAPIView

from .models import BoatCrew
from .serializers import BoatCrewSerializer


class ListBoatCrewView(ListAPIView):
    queryset = BoatCrew.objects.all()
    serializer_class = BoatCrewSerializer