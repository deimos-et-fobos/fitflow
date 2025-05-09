from django.urls import path
from .views import HistoryView, PlanCreateView, PlanDetailView, FeedbackDetailView

app_name = 'plans'
urlpatterns = [
    path('<int:id>/', PlanDetailView.as_view(), name='plan-detail'),   # GET
    path('create/', PlanCreateView.as_view(), name='plan-create'), # POST
    path('history/', HistoryView.as_view(), name='history'),
    path("<int:id>/feedback/", FeedbackDetailView.as_view()),  # GET y PATCH

]

