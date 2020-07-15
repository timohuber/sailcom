from rest_framework import serializers

from .models import Transaction
from ..booking.serializers import BookingInTransactionSerializer


class TransactionSerializer(serializers.ModelSerializer):
    booking = BookingInTransactionSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ['created', 'price', 'sent', 'booking']
