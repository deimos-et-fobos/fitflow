FROM python:3.12-slim

# -----------------------------------
# Etapa 1: Configuración del sistema
# -----------------------------------
WORKDIR /app

# Instalar dependencias del sistema y Node.js (v18)
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential \
    libpq-dev \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------------
# Etapa 2: Backend - Python
# -----------------------------------
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend/fitflow /app
COPY .env /app

# -----------------------------------
# Etapa 3: Frontend - Node.js
# -----------------------------------
COPY frontend/code/package*.json ./frontend/
RUN npm install --prefix ./frontend

COPY frontend/code/ ./frontend/

# -----------------------------------
# Script que inicia ambos servicios
# -----------------------------------
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 5173

CMD ["/start.sh"]
