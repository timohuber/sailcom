from django.urls import path

from .views import ListTransactionsView

urlpatterns = [
    path('', ListTransactionsView.as_view()),
]
