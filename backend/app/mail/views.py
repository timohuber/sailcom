from django.db.models import Q
from rest_framework.generics import ListAPIView

from .models import Mail
from .serializers import MailSerializer
from ..permissions import IsLoggedIn


class ListMailsView(ListAPIView):
    serializer_class = MailSerializer
    permission_classes = [IsLoggedIn]

    def get_queryset(self):
        return Mail.objects.filter(Q(recipient__exact=self.request.user.email))
