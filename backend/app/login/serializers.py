from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from ..user.meserializer import MeSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        user = MeSerializer(self.user)

        # Add extra responses here
        data['user'] = user.data
        return data
