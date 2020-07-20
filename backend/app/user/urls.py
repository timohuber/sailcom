from django.urls import path

from .views import ListUserView, ListUsersView, ListMe, ToggleInstructedForView

urlpatterns = [
    path('<int:pk>/', ListUserView.as_view()),
    path('', ListUsersView.as_view()),
    path('me/', ListMe.as_view()),
    path('toggleInstructed/', ToggleInstructedForView.as_view()),
]
