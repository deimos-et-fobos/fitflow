from rest_framework import serializers
from .models import DailyProgress, PlanChange


class DailyProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyProgress
        fields = [
            'id', 'meals_followed', 'workout_done',
            'weight_kg', 'bmi', 'mood', 'feedback'
        ]

    def validate(self, data):
        request = self.context.get('request')
        user = request.user
        weight_kg = data.get('weight_kg')
        
        data.pop('bmi', None)  
        if weight_kg is not None and user.height_cm:
            bmi = weight_kg / ((user.height_cm / 100) ** 2)
            data['bmi'] = round(bmi, 2)

        return data

        

class PlanChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanChange
        fields = '__all__'
