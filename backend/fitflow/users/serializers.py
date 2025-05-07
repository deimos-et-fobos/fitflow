from rest_framework import fields, serializers
from .models import CustomUser, DIETARY_RESTRICTIONS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    dietary_restrictions = fields.MultipleChoiceField(choices=DIETARY_RESTRICTIONS, default='')

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'name', 'age', 'sex', 'height_cm', 'weight_kg', 
                 'activity_level', 'dietary_restrictions', 'goal', 'accept_terms']
        extra_kwargs = {
            'password': {'write_only': True},
            'activity_level': {'default': 'sedentary'}, 
            'goal': {'default': 'maintain_weight'},
            'accept_terms': {'default': False}    
        }

    def validate(self, attrs):
        print(f"Dentro de validate: accept terms = {attrs}")
        if not attrs.get('accept_terms'):
            raise serializers.ValidationError({"accept_terms": "Debes aceptar los términos y condiciones."})
        return attrs

    def update(self, instance, validated_data):
        # Eliminar password del diccionario de validated_data para no permitir la actualización
        validated_data.pop('password', None)
        # Actualizar los demás campos
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            age=validated_data['age'],
            sex=validated_data['sex'],
            height_cm=validated_data['height_cm'],
            weight_kg=validated_data['weight_kg'],
            activity_level=validated_data['activity_level'],
            dietary_restrictions=validated_data['dietary_restrictions'],
            goal=validated_data['goal'],
            accept_terms=validated_data['accept_terms']
        )
        return user
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        token['email'] = user.email
        return token
