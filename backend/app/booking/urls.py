from django.urls import path

from .views import ListCreateBookingsView, CalculateBookingView, DestroyBookingView, MyBookingView

urlpatterns = [
    path('', ListCreateBookingsView.as_view()),
    path('<int:pk>/', DestroyBookingView.as_view()),
    path('calculate/', CalculateBookingView.as_view()),
    path('myBookings/', MyBookingView.as_view()),
]
