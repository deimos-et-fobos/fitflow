# Generated by Django 5.2 on 2025-05-05 21:37

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='mealplan',
            unique_together=set(),
        ),
        migrations.AlterUniqueTogether(
            name='workoutplan',
            unique_together=set(),
        ),
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'date')},
            },
        ),
        migrations.AddField(
            model_name='mealplan',
            name='plan',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='meal_plan', to='plans.plan'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workoutplan',
            name='plan',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='workout_plan', to='plans.plan'),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='mealplan',
            name='date',
        ),
        migrations.RemoveField(
            model_name='mealplan',
            name='user',
        ),
        migrations.RemoveField(
            model_name='workoutplan',
            name='date',
        ),
        migrations.RemoveField(
            model_name='workoutplan',
            name='user',
        ),
    ]
