from django.shortcuts import get_object_or_404

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema

from plans.models import Plan
from progress.models import DailyProgress, PlanChange
from progress.serializers import DailyProgressSerializer, PlanChangeSerializer

class FeedbackDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DailyProgressSerializer

    def get_object(self):
        user = self.request.user
        plan_id = self.kwargs.get("plan_id")
        plan = get_object_or_404(Plan, id=plan_id, user=user)
        return get_object_or_404(DailyProgress, plan=plan)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Si actualiza el peso, actualizamos también el del usuario
        weight_kg = request.data.get('weight_kg')
        if weight_kg:
            request.user.weight_kg = weight_kg
            request.user.save()

        return Response(serializer.data)

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
    

# class FeedbackCreateView(generics.CreateAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = DailyProgressSerializer

#     def create(self, request, *args, **kwargs):
#         user = request.user
#         data = request.data.copy()

#         plan = Plan.objects.filter(id=data.get('plan'), user=user).first()
#         if not plan:
#             return Response({"error": "No existe un plan para esa fecha."}, status=400)
        
#         if DailyProgress.objects.filter(plan=plan).exists():
#             return Response({"error": "Ya existe feedback para esa fecha."}, status=400)

#         serializer = self.get_serializer(data=data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()

#         # Si actualiza el peso, actualizamos también el del usuario
#         if 'weight_kg' in data:
#             request.user.weight_kg = data['weight_kg']
#             request.user.save()

#         return Response(serializer.data, status=status.HTTP_201_CREATED)



class PlanChangeView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PlanChangeSerializer
    
    def create(self, request, *args, **kwargs):
        user = request.user
        change_type = request.data.get('change')
        new_value = request.data.get('new')
        
        if not change_type or not new_value:
            return Response({"error": "Missing change type or new value"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Obtener valor anterior
        if change_type == "activity":
            previous_value = user.activity_level
            user.activity_level = new_value
        elif change_type == "dietary":
            previous_value = user.dietary_restrictions
            user.dietary_restrictions = new_value
        elif change_type == "goal":
            previous_value = user.goal
            user.goal = new_value
        else:
            return Response({"error": "Invalid change type"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.save()
        
        # Registrar el cambio
        change = PlanChange.objects.create(
            user=user,
            change=change_type,
            previous=previous_value,
            new=new_value
        )
        
        serializer = self.get_serializer(change)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
