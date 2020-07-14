from django.urls import path

from .views import ListBoatCrewView

urlpatterns = [
    path('', ListBoatCrewView.as_view()),
]