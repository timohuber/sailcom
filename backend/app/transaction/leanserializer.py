from rest_framework import serializers
from .models import Transaction


class LeanTransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ['created', 'price', 'sent']
