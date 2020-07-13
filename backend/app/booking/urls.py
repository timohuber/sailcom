from django.urls import path

from .views import ListCreateBookingsView

urlpatterns = [
    path('', ListCreateBookingsView.as_view()),
]