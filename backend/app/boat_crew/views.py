from rest_framework.generics import ListAPIView

from .models import BoatCrew
from .serializers import BoatCrewSerializer
from ..permissions import IsLoggedIn


class ListBoatCrewView(ListAPIView):
    queryset = BoatCrew.objects.all()
    serializer_class = BoatCrewSerializer


class ListBoatCrewMemberView(ListAPIView):
    serializer_class = BoatCrewSerializer
    permission_classes = [IsLoggedIn]

    def get_queryset(self):
        return BoatCrew.objects.filter(members=self.request.user)
