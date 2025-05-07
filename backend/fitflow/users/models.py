from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from multiselectfield import MultiSelectField
from django.core.validators import MinValueValidator

DIETARY_RESTRICTIONS = [
    ("vegan", "Vegana"),
    ("vegetarian", "Vegetariana"),
    ("gluten_free", "Sin gluten"),
    ("lactose_free", "Sin lactosa"),
    ("low_carb", "Baja en carbohidratos"),
    ("keto", "Keto"),
    ("paleo", "Paleo"),
    ("halal", "Halal"),
    ("kosher", "Kosher"),
    ("nut_free", "Sin frutos secos")
]

GOALS = [
    ("lose_weight", "Perder peso"),
    ("gain_muscle", "Ganar músculo"),
    ("maintain_weight", "Mantener peso"),
    ("improve_endurance", "Mejorar resistencia"),
    ("increase_flexibility", "Aumentar flexibilidad"),
    ("boost_energy", "Aumentar energía"),
    ("reduce_stress", "Reducir estrés"),
]

ACTIVITY_LEVELS = [
    ("sedentary", "Sedentary"),
    ("light", "Lightly Active"),
    ("moderate", "Moderately Active"),
    ("active", "Active"),
    ("very_active", "Very Active"),
]

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)
    

class CustomUser(AbstractUser):
    username=None
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.IntegerField(validators=[MinValueValidator(16)])
    sex = models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female')])
    height_cm = models.FloatField(validators=[MinValueValidator(0)])
    weight_kg = models.FloatField(validators=[MinValueValidator(0)])
    activity_level = models.CharField(max_length=30, choices=ACTIVITY_LEVELS, default="sedentary")
    dietary_restrictions = MultiSelectField(choices=DIETARY_RESTRICTIONS, default="")
    goal = models.CharField(max_length=30, choices=GOALS, default="maintain_weight")
    accept_terms = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'age', 'height_cm', 'weight_kg']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

