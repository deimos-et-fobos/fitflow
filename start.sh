#!/bin/bash

# Iniciar backend en segundo plano
echo "Iniciando backend..."
python manage.py makemigrations
python manage.py collectstatic --noinput
python manage.py migrate
gunicorn fitflow.wsgi:application --bind 0.0.0.0:8000 &

# Iniciar frontend en primer plano
echo "Iniciando frontend..."
npm run dev-host --prefix ./frontend
