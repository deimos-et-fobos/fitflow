# 💪 FitFlow Backend

Backend de **FitFlow**, una plataforma construida con Django y Django REST Framework para gestionar usuarios, objetivos de salud y configuraciones personalizadas.

---

## ⚙️ Tecnologías

- Python 3.12+
- Django 4+
- Django REST Framework
- PostgreSQL
- python-dotenv (para usar `.env`)
- drf-yasg (para documentación Swagger)

---

## 🚀 Cómo levantar el proyecto

### 1. Clona el repositorio 

```bash
git clone https://github.com/deimos-et-fobos/fitflow.git
cd fitflow/backend/
```

### 2. Crea y activa un entorno virtual

```bash
python -m venv venv
source venv/bin/activate  
```

### 3. Instala las dependencias

```bash
pip install -r requirements.txt
cd fitflow/
```

### 4. Configura tus variables de entorno

Crea un archivo `.env` en la raíz del proyecto, donde se encuentra ubicado el archivo `manage.py` (/fitflow/backend/fitflow/) con contenido como este:

```
ENVIRONMENT=development (o production para produccion)
SECRET_KEY=
DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
OPENAI_API_KEY1=
OPENAI_API_KEY2=
OPENAI_API_REGION=
OPENAI_API_URL=
```

### 5. Ejecutá las migraciones

Asegurate de estar en la raíz del proyecto, donde se encuentra ubicado el archivo `manage.py`

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
```

### 6. Crea un superusuario

```bash
python manage.py createsuperuser
```

### 7. Levantá el servidor de desarrollo

```bash
python manage.py runserver
```

---

## 📘 Documentación de la API (Swagger)

Una vez que el servidor esté corriendo, podés acceder a la documentación interactiva de los endpoints en:

[http://localhost:8000/swagger/](http://localhost:8000/swagger/)

En las `Responses` se muestra el Modelo y un ejemplo. Cuando no haya Modelo disponible se vera un cartel similar a ***Loading***, hacer click en ***Example Value*** para ver la respuesta esperada.

---

## 📂 Estructura del proyecto

```
fitflow/
├── backend/
│   ├── fitflow/
│   │   ├── fitflow/
│   │   │   ├── settings.py
│   │   │   └── urls.py
│   │   ├── plans/
│   │   ├── progress/
│   │   ├── users/
│   │   ├── .env
│   │   └── manage.py
│   ├── test/
│   ├── venv
│   ├── README.md
|   └── requirements.txt
├── frontend/
└── README.md
