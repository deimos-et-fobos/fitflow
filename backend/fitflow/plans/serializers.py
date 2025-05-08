from rest_framework import serializers
from plans.models import Plan, MealPlan, WorkoutPlan, TipsPlan
from progress.serializers import DailyProgressSerializer


class MealPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealPlan
        fields = ['id', 'meals']

class WorkoutPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPlan
        fields = ['id', 'workouts']

class TipsPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipsPlan
        fields = ['id', 'tips']


class PlanSerializer(serializers.ModelSerializer):
    meals = serializers.SerializerMethodField()
    workouts = serializers.SerializerMethodField()
    tips = serializers.SerializerMethodField()
    progress = DailyProgressSerializer(read_only=True)

    class Meta:
        model = Plan
        fields = ['id', 'user', 'date', 'meals', 'workouts', 'tips', 'progress']

    def get_meals(self, obj):
        if hasattr(obj, 'meals') and obj.meals:
            return obj.meals.meals
        return None
    
    def get_workouts(self, obj):
        if hasattr(obj, 'workouts') and obj.workouts:
            return obj.workouts.workouts 
        return None
    
    def get_tips(self, obj):
        if hasattr(obj, 'tips') and obj.tips:
            return obj.tips.tips 
        return None

    class Meta:
        model = Plan
        fields = ['id', 'user', 'date', 'meals', 'workouts', 'tips', 'progress']
        read_only_fields = ['user']  # se puede setear automáticamente en la view


class PlanListSerializer(serializers.ModelSerializer):
    progress = DailyProgressSerializer(read_only=True)

    class Meta:
        model = Plan
        fields = ['id', 'user', 'date', 'progress']
        read_only_fields = ['user','date']  # se puede setear automáticamente en la view
