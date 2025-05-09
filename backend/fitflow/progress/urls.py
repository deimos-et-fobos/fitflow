from django.urls import path
from .views import PlanChangeView

app_name = 'progress'
urlpatterns = [
    path('change-plan/', PlanChangeView.as_view(), name='change-plan'),
]
