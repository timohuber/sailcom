from django.urls import path

from app.boat.views import ListBoatsView
from app.event.event_type.views import ListEventTypeView

urlpatterns = [
    path('', ListBoatsView.as_view()),
    path('type/', ListEventTypeView.as_view()),
]