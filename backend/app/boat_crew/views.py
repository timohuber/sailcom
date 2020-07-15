from rest_framework.generics import ListAPIView

from .models import BoatCrew
from .serializers import BoatCrewSerializer


class ListBoatCrewView(ListAPIView):
    queryset = BoatCrew.objects.all()
    serializer_class = BoatCrewSerializer


class ListBoatCrewMemberView(ListAPIView):
    serializer_class = BoatCrewSerializer

    def get_queryset(self):
        return BoatCrew.objects.filter(members=self.request.user)
