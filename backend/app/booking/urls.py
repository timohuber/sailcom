from django.urls import path

from .views import ListCreateBookingsView, CalculateBookingView

urlpatterns = [
    path('', ListCreateBookingsView.as_view()),
    path('calculate/', CalculateBookingView.as_view()),
]
