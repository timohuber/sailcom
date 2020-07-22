from django.urls import path

from .views import MembershipTypesView

urlpatterns = [
    path('', MembershipTypesView.as_view()),
]
