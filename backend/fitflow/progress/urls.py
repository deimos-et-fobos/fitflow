from django.urls import path
from .views import FeedbackDetailView, PlanChangeView

app_name = 'progress'
urlpatterns = [
    # path("feedback/", FeedbackCreateView.as_view()),             # POST
    path("feedback/<int:plan_id>/", FeedbackDetailView.as_view()),  # GET y PATCH
    # path('change-plan/', PlanChangeView.as_view(), name='change-plan'),
]
