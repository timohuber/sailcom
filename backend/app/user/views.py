from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveUpdateAPIView, CreateAPIView

from .meserializer import MeSerializer
from .serializers import UserSerializer
from rest_framework import filters

from ..boat.boat_model.models import BoatModel
from ..invoice.models import Invoice
from ..permissions import IsStaff, IsLoggedIn
from ..transaction.models import Transaction

User = get_user_model()


class ListUserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsStaff]


class ListUsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email']
    permission_classes = [IsStaff]


class ListMe(RetrieveUpdateAPIView):
    serializer_class = MeSerializer
    permission_classes = [IsLoggedIn]

    def get_object(self):
        return self.request.user


class ToggleInstructedForView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsStaff]

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


class CreateEntryFeeView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsStaff]

    def post(self, request, *args, **kwargs):
        if len(User.objects.filter(id=self.request.data['User'])) == 0:
            return HttpResponse('Kunde existiert nicht', status=400)
        searchUser = User.objects.get(id=self.request.data['User'])
        if Transaction.objects.filter(user=searchUser, description='Eintrittsgebühr', invoice__closed=True):
            return HttpResponse('Kunde hat schon Eintrittsgebühr bezahlt', status=400)
        if Transaction.objects.filter(user=searchUser, description='Eintrittsgebühr', invoice__sent=False):
            return HttpResponse('Für diesen Kunden gibt es schon'
                                ' eine Eintrittsgebühr die noch nicht verschickt worden ist', status=400)
        if Transaction.objects.filter(user=searchUser, description='Eintrittsgebühr', invoice__sent=True):
            return HttpResponse('Für diesen Kunden gibt es schon'
                                ' eine Eintrittsgebühr die verschickt aber nicht bezahlt worden ist', status=400)
        trx = Transaction.objects.create(sent=False, description='Eintrittsgebühr', user=searchUser, price=120)
        inv = Invoice.objects.create(sent=False, closed=False)
        trx.invoice = inv
        trx.save()
        return HttpResponse('Eintrittsgebühr Rechnung wurde erstellt', status=200)


class TogglePaidEntryFeeView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsStaff]

    def post(self, request, *args, **kwargs):
        if len(User.objects.filter(id=self.request.data['User'])) == 0:
            return HttpResponse('Kunde existiert nicht', status=400)
        searchUser = User.objects.get(id=request.data['User'])
        if len(Transaction.objects.filter(user=searchUser, description='Eintrittsgebühr'))==0:
            return HttpResponse('Eintrittsgebührrechnung wurde nicht erstellt', status=400)
        searchTrx = Transaction.objects.get(user=searchUser, description='Eintrittsgebühr')
        searchInv = Invoice.objects.get(transactions=searchTrx)
        if searchInv.closed is True:
            return HttpResponse('Eintrittsgebühr wurde schon bezahlt', status=400)
        searchInv.sent = True
        searchInv.closed = True
        searchTrx.sent = True
        searchInv.save()
        searchTrx.save()
        return HttpResponse('Eintrittsgebühr wurde empfangen', status=200)
