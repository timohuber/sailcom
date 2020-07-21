from django.urls import path

from .views import ListUserView, ListUsersView, ListMe, ToggleInstructedForView, CreateEntryFeeView, \
    TogglePaidEntryFeeView, ToggleIsMemberView, CreateMembershipRequestView

urlpatterns = [
    path('<int:pk>/', ListUserView.as_view()),
    path('', ListUsersView.as_view()),
    path('me/', ListMe.as_view()),
    path('toggleInstructed/', ToggleInstructedForView.as_view()),
    path('entryFee/', CreateEntryFeeView.as_view()),
    path('togglePaidEntryFee/', TogglePaidEntryFeeView.as_view()),
    path('toggleIsMember/', ToggleIsMemberView.as_view()),
    path('membershipRequest/', CreateMembershipRequestView.as_view()),
]
