from django.urls import path

from app.boat.views import ListBoatsView, ListBoatView
from app.boat.boat_model.views import ListBoatModel
from app.boat_crew.views import ListBoatCrewView

urlpatterns = [
    path('', ListBoatsView.as_view()),
    path('<int:pk>/', ListBoatView.as_view()),
    path('models/', ListBoatModel.as_view()),
    path('crew/', ListBoatCrewView.as_view()),
]