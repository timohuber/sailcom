from rest_framework.generics import ListAPIView

from .models import MembershipType
from .serializers import MembershipTypeSerializer


class MembershipTypesView(ListAPIView):
    queryset = MembershipType.objects.all()
    serializer_class = MembershipTypeSerializer
    pagination_class = None
