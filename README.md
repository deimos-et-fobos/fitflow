# 💪 FitFlow

<p align="center">
  <img src="frontend/code/src/assets/logo.png" alt="FitFlow Logo" width="120" />
</p>

> Salud personalizada con IA para dieta, ejercicio y comunidad fitness

---

## ✨ ¿Qué es FitFlow?
FitFlow es una plataforma integral de salud y fitness que utiliza inteligencia artificial para ofrecer planes personalizados de dieta y ejercicio, seguimiento de progreso y una comunidad activa para motivar a los usuarios en su camino hacia una vida más saludable.

---

## 🧭 Tabla de contenidos

* [🚀 Características principales](#características-principales)
* [🛠️ Tecnologías utilizadas](#tecnologías-utilizadas)
* [📁 Estructura del proyecto](#estructura-del-proyecto)
* [⚙️ Instalación (Frontend y Backend)](#instalación-frontend-y-backend)
* [🧪 Uso](#uso)
* [🤝 Contribuciones](#contribuciones)
* [👨‍💻 Equipo de desarrollo](#equipo-de-desarrollo)
* [📄 Licencia](#licencia)

---

## 🚀 Características principales

✨ Interfaz amigable y moderna centrada en el usuario.
📊 Gestión de rutinas y seguimiento de progreso físico.
🎯 Acceso a contenido motivacional y educativo.
🧘 Adaptabilidad a diferentes tipos de usuario y niveles de experiencia.
📱 Totalmente responsiva para dispositivos móviles y tablets.
🔒 Autenticación segura.
🌙 Modo oscuro activado.

---

## 🛠️ Tecnologías utilizadas

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="React" style="background:white; border-radius:8px; padding:2px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="40" alt="Next.js" style="background:white; border-radius:8px; padding:2px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="TypeScript" style="background:white; border-radius:8px; padding:2px;" />
  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg" height="40" alt="Tailwind CSS" style="background:white; border-radius:8px; padding:6px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" height="40" alt="Django" style="background:white; border-radius:8px; padding:2px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="PostgreSQL" style="background:white; border-radius:8px; padding:2px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="40" alt="Docker" style="background:white; border-radius:8px; padding:2px;" />
</div>

* ⚛️ **React/Next.js** — Framework de React para SSR y generación estática.
* 🧑‍💻 **TypeScript** — Tipado fuerte para mayor robustez del código.
* 🎨 **Tailwind CSS** — Utilidades CSS para UI moderna y responsiva.
* 🐍 **Django** — Backend robusto y seguro para APIs.
* 🐘 **PostgreSQL** — Base de datos relacional avanzada.
* 🐳 **Docker** — Contenedores para desarrollo y despliegue ágil.

---

## 📁 Estructura del proyecto

```
fitflow/
├── app/                # Páginas y rutas principales
├── components/         # Componentes reutilizables de la UI
├── lib/                # Lógica auxiliar y configuración
├── public/             # Recursos estáticos (imágenes, íconos, logos)
├── styles/             # Estilos globales y configuraciones de Tailwind
├── types/              # Tipos globales en TypeScript
├── zustand/            # Stores para manejo de estado
└── README.md           # Este archivo 🧾
```

---

## ⚙️ Instalación (Frontend y Backend)

### 🔧 Requisitos

* Node.js >= 18
* npm o yarn

### 🔌 Clonación del proyecto

```bash
git clone https://github.com/deimos-et-fobos/fitflow.git
cd fitflow
```

### 💻 Instalación del Frontend

```bash
npm install       # o yarn install
```

### 🔐 Configuración del entorno

Crea un archivo `.env.local` en la raíz del proyecto con las variables necesarias para tu entorno local.

### 🚀 Inicio del servidor de desarrollo

```bash
npm run dev
```

Visita: [http://localhost:3000](http://localhost:3000)

### 🔧 Backend

* Configura tu entorno Django y PostgreSQL según la documentación interna del proyecto.
* Usa Docker Compose para levantar los servicios si lo prefieres.

---

## 🧪 Uso

1. Configura el archivo `.env.local` como se muestra arriba.
2. Ejecuta `npm run dev`.
3. Visita `http://localhost:3000` y comienza a explorar FitFlow.

> 🎨 Los estilos están listos para personalización con Tailwind (`tailwind.config.js`).

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar con nuevas ideas o funcionalidades:

1. Haz un fork del repositorio.
2. Crea una nueva rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:

   ```bash
   git commit -m "✨ Agrega nueva funcionalidad"
   ```
4. Envía un pull request y lo revisaremos con gusto.

> 💡 Tips: Usa nombres descriptivos para tus commits y ramas.

---

## 👨‍💻 Equipo de desarrollo

| Nombre              | Rol                | GitHub                                                     | LinkedIn                                                          |
| ------------------- | ------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------- |
| **Emmanuel Cruz**   | Frontend Developer | [@emmanuel-cruz-dev](https://github.com/emmanuel-cruz-dev) | [LinkedIn](https://www.linkedin.com/in/emmanuel-cruz-dev/)        |
| **José Ortega**     | Frontend Developer | [@joseorteha](https://github.com/joseorteha)               | [LinkedIn](https://www.linkedin.com/in/jose-orteg4)               |
| **Ricardo Márquez** | Backend Developer  | [@cronosmorfeo](https://github.com/cronosmorfeo)           | [LinkedIn](https://www.linkedin.com/in/ricardo-marquez-turiello/) |
| **Andrey Rojas**    | Backend Developer  | [@cronosmorfeo](https://github.com/cronosmorfeo)           | [LinkedIn](https://www.linkedin.com/in/andreyrojasdelgado/)       |
| **Luz (Luchi)**     | UX/UI Designer     | [@WGutierrez89](https://github.com/WGutierrez89)           | -                                                                 |

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más información.

---

Desarrollado con ❤️ por el equipo FitFlow — impulsando tu bienestar con tecnología.

![FitFlow Logo](frontend/code/src/assets/logo.png)
