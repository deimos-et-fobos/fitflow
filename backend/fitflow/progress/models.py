from django.db import models
from django.conf import settings

CHANGE_TYPES = [
    ("activity", "Nivel de actividad"),
    ("diet", "Tipo de alimentación"),
    ("goal", "Meta")
]


class PlanChange(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    change = models.CharField(max_length=20, choices=CHANGE_TYPES)
    previous = models.CharField(max_length=20)
    new = models.CharField(max_length=20)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} changed {self.change} from {self.previous} to {self.new}"

