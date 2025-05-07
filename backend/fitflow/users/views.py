from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @swagger_auto_schema(
        operation_description="Login y obtención de tokens JWT",
        security=[],  # No requiere autenticación
        responses={
            400: openapi.Response(
                description="Bad Request",
                examples={
                    "application/json": {
                        "field_1": ["Field 1 erros ...", "..."],
                        "field_2": ["Field 2 erros ...", "..."],
                        "accept_terms": ["Debes aceptar los términos y condiciones."]
                    }
                }
            )
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    @swagger_auto_schema(
        operation_description="Login y obtención de tokens JWT",
        security=[],  # No requiere autenticación
        responses={
            200: openapi.Response(
                description="Tokens JWT",
                examples={
                    "application/json": {
                        "access": "eyJ0eXAiOiJKV1QiLCJhbGci...",
                        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGci..."
                    }
                }
            ),
            400: openapi.Response(
                description="Bad Request",
                examples={
                    "application/json": {
                        "detail": "No active account found with the given credentials"
                    }
                }
            )
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user
    
    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Logout",
        security=[],  # No requiere autenticación
        responses={
            205: openapi.Response(
                description="Token Blacklisted",
                examples={
                    "application/json": {
                        "detail": "Sesión cerrada correctamente."
                    }
                }
            ),
            400: openapi.Response(
                description="Invalid Token",
                examples={
                    "application/json": {
                        "error": "Token is invalid"
                    }
                }
            ),
            401: openapi.Response(
                description="Unauthorized",
            )
        }
    )
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Sesión cerrada correctamente."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)