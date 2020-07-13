from django.urls import path

from app.boat.views import ListBoatsView

urlpatterns = [
    path('', ListBoatsView.as_view()),
]