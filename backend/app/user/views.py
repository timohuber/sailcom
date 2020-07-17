from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import HttpResponse
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveUpdateAPIView, CreateAPIView

from .meserializer import MeSerializer
from .serializers import UserSerializer
from rest_framework import filters

from ..boat.boat_model.models import BoatModel

User = get_user_model()


class ListUserView(RetrieveAPIView):
    serializer_class = UserSerializer

    # TODO
    # add permission class, only staff

    def get_queryset(self):
        param = self.request.GET.get('search', '')
        if param != '':
            return User.objects.filter(Q(email__contains=param)
                                       | Q(first_name__contains=param)
                                       | Q(last_name__contains=param))


class ListUsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email']


class ListMe(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = MeSerializer

    def get_object(self):
        return self.request.user


class ToggleInstructedForView(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        searchUser = User.objects.filter(id=request.data['User'])
        searchModel = BoatModel.objects.filter(id=request.data['BoatModel'])
        isInstructed = User.objects.filter(id=request.data['User'], instructed_for_models__in=searchModel)

        if len(isInstructed) == 0:
            searchUser[0].instructed_for_models.add(searchModel[0])
            return HttpResponse('Neues Boot Model wurde freigeschaltet', status=200)
        else:
            searchUser[0].instructed_for_models.remove(searchModel[0])
            return HttpResponse('Boot Model wurde entfernt', status=200)
