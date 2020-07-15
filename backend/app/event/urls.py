from django.urls import path


from .event_type.views import ListEventTypeView

from .views import ListEventView, ListEventsView, ListEventsAllView

urlpatterns = [
    path('', ListEventsView.as_view()),
    path('all/', ListEventsAllView.as_view()),
    path('<int:pk>/', ListEventView.as_view()),
    path('type/', ListEventTypeView.as_view()),
]
