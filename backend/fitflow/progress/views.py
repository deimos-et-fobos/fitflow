from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema

from progress.models import PlanChange
from progress.serializers import PlanChangeSerializer


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
