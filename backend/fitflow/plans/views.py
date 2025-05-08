from datetime import datetime, timedelta
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import generics, status, serializers
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from plans.models import Plan, MealPlan, WorkoutPlan, TipsPlan
from plans.serializers import PlanSerializer, PlanListSerializer
from plans.open_AI_service import generate_plan
from users.permissions import HasAcceptedTerms

class HistoryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PlanSerializer

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
                "id": 11,
                "user": 20,
                "date": "2025-05-08",
                "meals": {
                    "breakfast": {
                        "08:00": [
                            "1 taza de avena cocida con leche descremada",
                            "1 plátano",
                            "1 cucharada de nueces"
                        ]
                    },
                    "lunch": {
                        "12:30": [
                            "150g de pechuga de pollo a la plancha",
                            "1 taza de brócoli al vapor",
                            "1/2 taza de quinoa"
                        ]
                    },
                    "snack": {
                        "16:00": [
                            "1 yogur natural bajo en grasa",
                            "1 manzana"
                        ]
                    },
                    "dinner": {
                        "19:30": [
                            "200g de pescado al horno",
                            "1 taza de espinacas salteadas",
                            "1 batata asada"
                        ]
                    }
                },
                "workouts": {
                    "duration": "60 min",
                    "warmup": "5-10 minutos de caminata ligera o trotando suavemente",
                    "exercises": {
                        "push-up": "10x4",
                        "sentadillas": "12x3",
                        "plancha": "30 seg x 3",
                        "remo con mancuerna": "10x4 (cada brazo)",
                        "puente": "15x3"
                    },
                    "stretching": "5-10 minutos de estiramientos enfocados en brazos, piernas y espalda."
                },
                "tips": [
                    "Mantén una buena hidratación, bebe al menos 2 litros de agua al día.",
                    "Intenta incorporar al menos 30 minutos de actividad física en tu rutina diaria."
                ],
                "progress": None,
                "bmi": 26.79,
                "bmi_status": "OK"
            }
        }

class PlanCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PlanCreateViewResponseSerializer

    @swagger_auto_schema(
        request_body=openapi.Schema(type=openapi.TYPE_OBJECT),
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

        

        plan = Plan.objects.create(user=user, date=today)
        # plan, created = Plan.objects.get_or_create(user=user, date=today)
        # # Si ya existe el plan, no regeneramos todo (esto lo puedes adaptar)
        # if not created:
        #     return Response({"detail": "El plan ya existe."}, status=status.HTTP_409_CONFLICT)
        
        daily_plan = generate_plan(user)
        print(daily_plan)
        
        # BMI (solo para info, no se guarda)
        bmi = user.weight_kg / ((user.height_cm / 100) ** 2)

        try:
            with transaction.atomic():
                MealPlan.objects.create(plan=plan, meals=daily_plan.get('meals'))
                WorkoutPlan.objects.create(plan=plan, workouts=daily_plan.get('workouts'))
                TipsPlan.objects.create(plan=plan, tips=daily_plan.get('tips'))
        except Exception as e:
            plan.delete()  # Limpieza si falló algo después del get_or_create
            return Response({"detail": f"Error al crear el plan: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # DailyProgress.objects.create(plan=plan)   
        plan_data = PlanSerializer(plan).data

        return Response({
            **plan_data,
            "bmi": round(bmi, 2),
            "bmi_status": self._get_bmi_status(bmi)
        }, status=status.HTTP_201_CREATED)

    def _get_bmi_status(self, bmi):
        if bmi < 18.5 or bmi > 30:
            return 'WARNING'
        return 'OK'
        # if bmi < 18.5:
        #     return "underweight"
        # elif 18.5 <= bmi < 25:
        #     return "normal"
        # elif 25 <= bmi < 30:
        #     return "overweight"
        # else:
        #     return "obese"



class PlanDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
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
