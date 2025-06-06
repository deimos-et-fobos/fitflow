# Generated by Django 5.2 on 2025-05-04 20:51

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DailyProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('recommended_meals', models.JSONField()),
                ('recommended_workout', models.JSONField()),
                ('meals_followed', models.BooleanField(default=False)),
                ('workout_done', models.BooleanField(default=False)),
                ('weight_kg', models.FloatField(blank=True, null=True)),
                ('mood', models.IntegerField(blank=True, null=True)),
                ('feeback', models.CharField()),
            ],
        ),
        migrations.CreateModel(
            name='PlanChange',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('change', models.CharField(choices=[('activity', 'Nivel de actividad'), ('diet', 'Tipo de alimentación'), ('goal', 'Meta')], max_length=20)),
                ('previous', models.CharField(max_length=20)),
                ('new', models.CharField(max_length=20)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
