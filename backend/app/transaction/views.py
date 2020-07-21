from django.db.models import Q
from rest_framework.generics import ListAPIView

from .models import Transaction
from .serializers import TransactionSerializer
from ..permissions import IsLoggedIn


class ListTransactionsView(ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsLoggedIn]

    def get_queryset(self):
        return Transaction.objects.filter(Q(user=self.request.user))
