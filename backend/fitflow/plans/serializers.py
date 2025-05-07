from rest_framework import serializers
from plans.models import Plan, MealPlan, WorkoutPlan
from progress.serializers import DailyProgressSerializer


class MealPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealPlan
        fields = ['id', 'meals']

class WorkoutPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPlan
        fields = ['id', 'exercises']


class PlanSerializer(serializers.ModelSerializer):
    meal_plan = MealPlanSerializer(read_only=True)
    workout_plan = WorkoutPlanSerializer(read_only=True)
    progress = DailyProgressSerializer(read_only=True)

    class Meta:
        model = Plan
        fields = ['id', 'user', 'date', 'meal_plan', 'workout_plan', 'progress']
        read_only_fields = ['user']  # se puede setear automáticamente en la view


class PlanListSerializer(serializers.ModelSerializer):
    progress = DailyProgressSerializer(read_only=True)

    class Meta:
        model = Plan
        fields = ['id', 'user', 'date', 'progress']
        read_only_fields = ['user','date']  # se puede setear automáticamente en la view
