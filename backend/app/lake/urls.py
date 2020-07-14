from django.urls import path

from .views import ListLakesView

urlpatterns = [
    path('', ListLakesView.as_view()),
]
