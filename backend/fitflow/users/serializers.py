from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import CustomUser, DIETARY_RESTRICTIONS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    dietary_restrictions = serializers.MultipleChoiceField(choices=DIETARY_RESTRICTIONS, required=False, allow_null=True, default=list)
    accept_terms = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'name', 'age', 'sex', 'height_cm', 'weight_kg', 
                 'activity_level', 'dietary_restrictions', 'goal', 'accept_terms']
        extra_kwargs = {
            'password': {'write_only': True},
            'activity_level': {'required': False, 'default': 'sedentary'},
            'goal': {'required': False, 'default': 'maintain_weight'},
            'accept_terms': {'required': False},
            'name': {'required': True},
            'age': {'required': False, 'allow_null': True},
            'sex': {'required': False, 'allow_null': True},
            'height_cm': {'required': False, 'allow_null': True},
            'weight_kg': {'required': False, 'allow_null': True},
            'dietary_restrictions': {'required': False, 'allow_null': True},
        }
    
    def validate(self, attrs):
        request = self.context.get('request')
        
        if request and request.method == 'POST':
            if not attrs.get('accept_terms', False):
                raise serializers.ValidationError({"accept_terms": "Debes aceptar los términos y condiciones."})

            password = attrs.get('password')
            if password:
                validate_password(password)

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop('password', None)
        validated_data.pop('accept_terms', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
    def create(self, validated_data):
        validated_data.pop('accept_terms', None)
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name', ''),
            age=validated_data.get('age'),
            sex=validated_data.get('sex'),
            height_cm=validated_data.get('height_cm'),
            weight_kg=validated_data.get('weight_kg'),
            activity_level=validated_data.get('activity_level', 'sedentary'),
            dietary_restrictions=validated_data.get('dietary_restrictions', []),
            goal=validated_data.get('goal', 'maintain_weight'),
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'age': user.age,
            'sex': user.sex,
            'height_cm': user.height_cm,
            'weight_kg': user.weight_kg,
            'activity_level': user.activity_level,
            'dietary_restrictions': user.dietary_restrictions,
            'goal': user.goal
        }
        return data