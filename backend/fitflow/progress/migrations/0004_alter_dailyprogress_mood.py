# Generated by Django 5.2 on 2025-05-06 15:20

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress', '0003_alter_dailyprogress_unique_together_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailyprogress',
            name='mood',
            field=models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
