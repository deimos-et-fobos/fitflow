from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import generics, status, serializers
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from plans.models import Plan, MealPlan, WorkoutPlan
from plans.serializers import PlanSerializer, PlanListSerializer
from users.permissions import HasAcceptedTerms


class HistoryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, HasAcceptedTerms]
    serializer_class = PlanListSerializer

    @swagger_auto_schema(
        operation_description="Login y obtención de tokens JWT",
        manual_parameters=[
            openapi.Parameter(
                'days',
                openapi.IN_QUERY,
                description="Cantidad de días hacia atrás desde hoy (por defecto 7)",
                type=openapi.TYPE_INTEGER,
                required=False
            )
        ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        days = int(self.request.query_params.get('days', 7))
        start_date = timezone.now().date() - timedelta(days=days)
        return Plan.objects.filter(user=user, date__gte=start_date).order_by('-date')


class PlanCreateViewResponseSerializer(serializers.Serializer):
    plan = PlanSerializer()
    bmi = serializers.FloatField()
    bmi_status = serializers.CharField()

    class Meta:
        swagger_schema_fields = {
            "example": {
                'plan': {
                    'user': 1,
                    'date': '2025-05-06',
                    'meals': {
                        'breakfast': ['Oatmeal with fruits', 'Green tea'],
                        'lunch': ['Grilled chicken', 'Quinoa', 'Steamed vegetables'],
                        'dinner': ['Salmon', 'Brown rice', 'Salad'],
                        'snacks': ['Greek yogurt', 'Handful of nuts']
                    },
                    'exercises': [
                        {'name': 'Push-ups', 'reps': 10, 'sets': 3},
                        {'name': 'Squats', 'reps': 15, 'sets': 3},
                        {'name': 'Plank', 'duration': '30 seconds', 'sets': 3}
                    ]
                },
                'bmi': 22.5,
                'bmi_status': 'Normal weight'
            }
        }

class PlanCreateView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, HasAcceptedTerms]
    
    @swagger_auto_schema(
        responses={
            201: openapi.Response(
                description="Plan creado correctamente",
                schema=PlanCreateViewResponseSerializer,
            ),
            409: openapi.Response(
                description="Plan already exists.",
                examples={
                    "application/json": {
                        "detail": "El plan ya existe."
                    }
                }
            )
        }
    )
    def post(self, request, *args, **kwargs):
        user = request.user
        today = timezone.now().date()

        plan, created = Plan.objects.get_or_create(user=user, date=today)

        # Si ya existe el plan, no regeneramos todo (esto lo puedes adaptar)
        if not created:
            return Response({"detail": "El plan ya existe."}, status=status.HTTP_409_CONFLICT)

        # BMI (solo para info, no se guarda)
        bmi = user.weight_kg / ((user.height_cm / 100) ** 2)

        # Recomendaciones dummy
        meals = {
            "breakfast": ["Oatmeal with fruits", "Green tea"],
            "lunch": ["Grilled chicken", "Quinoa", "Steamed vegetables"],
            "dinner": ["Salmon", "Brown rice", "Salad"],
            "snacks": ["Greek yogurt", "Handful of nuts"]
        }

        exercises = [
            {"name": "Push-ups", "reps": 10, "sets": 3},
            {"name": "Squats", "reps": 15, "sets": 3},
            {"name": "Plank", "duration": "30 seconds", "sets": 3}
        ]

        MealPlan.objects.create(plan=plan, meals=meals)
        WorkoutPlan.objects.create(plan=plan, exercises=exercises)
        # DailyProgress.objects.create(plan=plan)

        data = PlanSerializer(plan).data
        return Response({
            "plan": data,
            "bmi": round(bmi, 2),
            "bmi_status": self._get_bmi_status(bmi)
        }, status=status.HTTP_201_CREATED)

    def _get_bmi_status(self, bmi):
        if bmi < 18.5 or bmi > 30:
            return 'warning'
        return ''
        # if bmi < 18.5:
        #     return "underweight"
        # elif 18.5 <= bmi < 25:
        #     return "normal"
        # elif 25 <= bmi < 30:
        #     return "overweight"
        # else:
        #     return "obese"



class PlanDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, HasAcceptedTerms]
    serializer_class = PlanSerializer

    @swagger_auto_schema(
        responses={
            404: openapi.Response(
                description="Plan no encontrado.",
                examples={
                    "application/json": {
                        "detail": "No Plan matches the given query."
                    }
                }
            )
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    def get_object(self):
        user = self.request.user
        id = self.kwargs.get('id')  # viene de la URL
        return get_object_or_404(Plan, user=user, id=id)
