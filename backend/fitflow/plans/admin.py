from django.contrib import admin
from .models import Plan, TipsPlan, MealPlan, WorkoutPlan, DailyProgress

admin.site.register(Plan)
admin.site.register(MealPlan)
admin.site.register(WorkoutPlan)
admin.site.register(TipsPlan)
admin.site.register(DailyProgress)

