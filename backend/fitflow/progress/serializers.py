from rest_framework import serializers
from .models import DailyProgress, PlanChange


class DailyProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyProgress
        fields = [
            'id', 'plan', 'meals_followed', 'workout_done', 'weight_kg', 'bmi', 'mood', 'feedback'
        ]
        read_only_fields = ['plan', 'bmi']  # se puede setear automáticamente en la view
        

class PlanChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanChange
        fields = '__all__'
