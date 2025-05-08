from django.db import models
from django.conf import settings
from django.utils import timezone

class Plan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now().date())

    class Meta:
        unique_together = ('user', 'date')

class MealPlan(models.Model):
    plan = models.OneToOneField(Plan, on_delete=models.CASCADE, related_name='meals')
    meals = models.JSONField()

class WorkoutPlan(models.Model):
    plan = models.OneToOneField(Plan, on_delete=models.CASCADE, related_name='workouts')
    workouts = models.JSONField()

class TipsPlan(models.Model):
    plan = models.OneToOneField(Plan, on_delete=models.CASCADE, related_name='tips')
    tips = models.JSONField()

