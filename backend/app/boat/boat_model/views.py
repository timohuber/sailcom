from rest_framework.generics import ListAPIView

from .models import BoatModel
from .serializers import BoatModelSerializer


class ListBoatModel(ListAPIView):
    queryset = BoatModel.objects.all()
    serializer_class = BoatModelSerializer
