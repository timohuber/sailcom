from django.db.models import Q
from rest_framework.generics import ListAPIView

from .models import Transaction
from .serializers import TransactionSerializer


class ListTransactionsView(ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(Q(user=self.request.user))
