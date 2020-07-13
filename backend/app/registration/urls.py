from django.urls import path
from .views import CreateRegistrationView, ValidateRegistrationView

urlpatterns = [
    path('', CreateRegistrationView.as_view()),
     path('validation/', ValidateRegistrationView.as_view())
]