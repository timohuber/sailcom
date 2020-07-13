from django.contrib import admin
from django.urls import path, include

# login
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views as jwt_views
from .login.views import CustomTokenObtainPairView


urlpatterns = [

    path('backend/api/boat/', include('app.boat.urls')),
    path('backend/api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('backend/api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
    path('backend/api/registration/', include('app.registration.urls')),

    path('backend/admin/', admin.site.urls),
    path('backend/api/docs/', include_docs_urls(title='Sailcom API documentation', permission_classes=[])),
]
