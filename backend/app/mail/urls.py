from django.urls import path

from .views import ListMailsView

urlpatterns = [
    path('', ListMailsView.as_view()),
]
