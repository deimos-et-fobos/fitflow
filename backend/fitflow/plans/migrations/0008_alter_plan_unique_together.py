# Generated by Django 5.2 on 2025-05-08 23:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0007_merge_20250508_1926'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='plan',
            unique_together=set(),
        ),
    ]
