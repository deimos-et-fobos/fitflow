from rest_framework import serializers
from .models import PlanChange


        

class PlanChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanChange
        fields = '__all__'
