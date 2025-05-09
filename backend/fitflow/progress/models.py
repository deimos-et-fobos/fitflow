from django.db import models
from django.conf import settings
from plans.models import Plan
from django.core.validators import MinValueValidator, MaxValueValidator

CHANGE_TYPES = [
    ("activity", "Nivel de actividad"),
    ("diet", "Tipo de alimentación"),
    ("goal", "Meta")
]

class DailyProgress(models.Model):
    plan = models.OneToOneField(Plan, on_delete=models.CASCADE, related_name='progress')
    meals_followed = models.BooleanField(default=False)
    workout_done = models.BooleanField(default=False)
    weight_kg = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    bmi = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    mood = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    feedback = models.CharField(null=True, blank=True, max_length=100)

class PlanChange(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    change = models.CharField(max_length=20, choices=CHANGE_TYPES)
    previous = models.CharField(max_length=20)
    new = models.CharField(max_length=20)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} changed {self.change} from {self.previous} to {self.new}"

