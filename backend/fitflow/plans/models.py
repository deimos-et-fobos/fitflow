from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

class Plan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now) 

    class Meta:
        ordering = ['-date']
    #     unique_together = ('user', 'date')

class MealPlan(models.Model):
    plan = models.OneToOneField(Plan, on_delete=models.CASCADE, related_name='meals')
    meals = models.JSONField()

class WorkoutPlan(models.Model):
    plan = models.OneToOneField(Plan, on_delete=models.CASCADE, related_name='workouts')
    workouts = models.JSONField()

class TipsPlan(models.Model):
    plan = models.OneToOneField(Plan, on_delete=models.CASCADE, related_name='tips')
    tips = models.JSONField()



class DailyProgress(models.Model):
    plan = models.OneToOneField(Plan, on_delete=models.CASCADE, related_name='progress')
    meals_followed = models.BooleanField(default=False)
    workout_done = models.BooleanField(default=False)
    weight_kg = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    bmi = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    mood = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    feedback = models.CharField(null=True, blank=True, max_length=100)