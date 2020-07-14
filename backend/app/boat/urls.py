from django.urls import path

from app.boat.views import ListBoatsView
from app.boat.boat_model.views import ListBoatModel


urlpatterns = [
    path('', ListBoatsView.as_view()),
    path('models/', ListBoatModel.as_view()),
]