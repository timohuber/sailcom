from rest_framework.generics import ListAPIView

from .models import EventType
from .serializers import EventTypeSerializer


class ListEventTypeView(ListAPIView):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer
