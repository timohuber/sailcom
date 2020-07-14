from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'salutation', 'email', 'first_name', 'last_name', 'street', 'address_appendix', 'city',
                  'country', 'zip_code', 'phone', 'mobile', 'date_of_birth', 'licence', 'joined', 'avatar',
                  'licence_ok', 'entry_fee_paid']
