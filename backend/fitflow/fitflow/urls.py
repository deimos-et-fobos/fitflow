from django.contrib import admin
from django.urls import include, path
from fitflow.swagger import urls as swagger_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/plans/', include('plans.urls')),
    path('api/progress/', include('progress.urls')),
    path('api/users/', include('users.urls')),
    path('', include(swagger_urls)),
]
