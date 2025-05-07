from django.contrib import admin
from .models import DailyProgress, PlanChange

# Register your models here.
admin.site.register(DailyProgress)
admin.site.register(PlanChange)