from rest_framework import serializers
from .models import CustomUser, DIETARY_RESTRICTIONS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    dietary_restrictions = serializers.MultipleChoiceField(choices=DIETARY_RESTRICTIONS, default=list)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'name', 'age', 'sex', 'height_cm', 'weight_kg', 
                 'activity_level', 'dietary_restrictions', 'goal', 'accept_terms']
        extra_kwargs = {
            'password': {'write_only': True},
            'activity_level': {'default': 'moderate'},  # Alineado con authService.ts
            'goal': {'default': 'maintain_weight'},     # Alineado con authService.ts
            'accept_terms': {'default': False},         # Validado por separado
            'age': {'required': False, 'allow_null': True},
            'sex': {'required': False, 'allow_null': True},
            'height_cm': {'required': False, 'allow_null': True},
            'weight_kg': {'required': False, 'allow_null': True},
            'dietary_restrictions': {'required': False, 'allow_null': True},
        }

    def validate(self, attrs):
        print(f"Dentro de validate: accept_terms = {attrs.get('accept_terms')}")
        if not attrs.get('accept_terms', False):
            raise serializers.ValidationError({"accept_terms": "Debes aceptar los términos y condiciones."})
        return attrs

    def update(self, instance, validated_data):
        validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name', ''),
            age=validated_data.get('age', 18),          # Valor por defecto
            sex=validated_data.get('sex', 'M'),         # Valor por defecto
            height_cm=validated_data.get('height_cm', 170),  # Valor por defecto
            weight_kg=validated_data.get('weight_kg', 70),   # Valor por defecto
            activity_level=validated_data.get('activity_level', 'moderate'),  # Alineado
            dietary_restrictions=validated_data.get('dietary_restrictions', []),  # Alineado
            goal=validated_data.get('goal', 'maintain_weight'),  # Alineado
            accept_terms=validated_data.get('accept_terms', True),  # Alineado
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        token['email'] = user.email
        return token