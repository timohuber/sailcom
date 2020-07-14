from django.urls import path

from .views import ListBoatModel

urlpatterns = [
    path('', ListBoatModel.as_view()),
]
