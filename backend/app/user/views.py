from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveUpdateAPIView

from .serializers import UserSerializer
from rest_framework import filters

User = get_user_model()


class ListUserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ListUsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email']


class ListMe(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
