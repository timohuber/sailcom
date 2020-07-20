from django.urls import path

from .views import ListBoatsView, ListBoatView, ListBoatsWhereCrewView, SearchBoatsView
from .boat_model.views import ListBoatModel
from ..boat_crew.views import ListBoatCrewView, ListBoatCrewMemberView

urlpatterns = [
    path('', ListBoatsView.as_view()),
    path('search/', SearchBoatsView.as_view()),
    path('wherecrew/', ListBoatsWhereCrewView.as_view()),
    path('<int:pk>/', ListBoatView.as_view()),
    path('models/', ListBoatModel.as_view()),
    path('crew/', ListBoatCrewView.as_view()),
    path('crew/member/', ListBoatCrewMemberView.as_view()),
]