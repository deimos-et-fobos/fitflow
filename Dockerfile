FROM node:18 AS frontend

WORKDIR /app

COPY /frontend/code/package*.json ./code/
RUN npm install --prefix ./code

COPY /frontend/code/ ./code/

EXPOSE 5173

CMD ["npm", "run", "dev-host", "--prefix", "./code"]


FROM python:3.12-slim
    
WORKDIR /app

# Dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Dependencias de Python
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar backend
COPY ./backend /app

COPY .env .env

# Copiar el frontend compilado desde la etapa anterior
COPY --from=frontend /app/code/dist /app/frontend-dist

EXPOSE 8000

# Ejecutar el servidor de backend
CMD bash -c "python manage.py collectstatic --noinput && \
             python manage.py migrate && \
             gunicorn fitflow.wsgi:application --bind 0.0.0.0:8000"
