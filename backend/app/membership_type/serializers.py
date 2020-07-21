from rest_framework import serializers

from .models import MembershipType


class MailSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipType
        exclude = ()
