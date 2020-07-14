from rest_framework.generics import ListAPIView

from .models import Lake
from .serializers import LakeSerializer


class ListLakesView(ListAPIView):
    queryset = Lake.objects.all()
    serializer_class = LakeSerializer
