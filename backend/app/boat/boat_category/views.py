from rest_framework.generics import ListAPIView

from .models import BoatCategory
from .serializers import BoatCategorySerializer


class ListBoatCategories(ListAPIView):
    queryset = BoatCategory.objects.all()
    serializer_class = BoatCategorySerializer
    pagination_class = None
