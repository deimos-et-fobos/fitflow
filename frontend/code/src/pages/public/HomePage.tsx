import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  BookCheckIcon,
  BrainIcon,
  ChartExesIcon,
  UtensilsIcon,
} from "../../components/ui/Icons";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section con Video de Fondo */}
      <article className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-50"
            poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>

        <div className="relative z-10 text-center px-6 py-24 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8">
            Bienvenido a FitFlow
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-200 max-w-2xl mx-auto">
            Tu bienestar, potenciado por la inteligencia artificial. Registra
            tus datos de salud y recibe planes de alimentación y ejercicio
            personalizados que se adaptan en tiempo real a tu progreso.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Ir al Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Registrarse <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </article>

      {/* Features Section */}
      <article className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Todo lo que necesitas para empezar
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              Descubre cómo nuestra plataforma transforma tus datos en acciones
              saludables y efectivas.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col items-start group">
                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-3 ring-1 ring-gray-900/10 transition-all duration-300 group-hover:scale-105">
                  <BrainIcon className="h-10 w-10 text-white" />
                </div>
                <dt className="mt-4 text-xl font-semibold leading-7 text-gray-900">
                  Recomendaciones personalizadas con IA
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Analizamos tus métricas y preferencias para generar planes
                  únicos y adaptados a ti.
                </dd>
              </div>

              <div className="flex flex-col items-start group">
                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-3 ring-1 ring-gray-900/10 transition-all duration-300 group-hover:scale-105">
                  <ChartExesIcon className="h-10 w-10 text-white" />
                </div>
                <dt className="mt-4 text-xl font-semibold leading-7 text-gray-900">
                  Seguimiento y ajuste continuo
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Cada dato nuevo optimiza tus rutinas y mejora la precisión de
                  las sugerencias.
                </dd>
              </div>

              <div className="flex flex-col items-start group">
                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-3 ring-1 ring-gray-900/10 transition-all duration-300 group-hover:scale-105">
                  <BookCheckIcon className="h-10 w-10 text-white" />
                </div>
                <dt className="mt-4 text-xl font-semibold leading-7 text-gray-900">
                  Registro fácil de salud y hábitos
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Ingresa peso, altura, comidas favoritas y más desde una interfaz
                  intuitiva.
                </dd>
              </div>

              <div className="flex flex-col items-start group">
                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-3 ring-1 ring-gray-900/10 transition-all duration-300 group-hover:scale-105">
                  <UtensilsIcon className="h-10 w-10 text-white" />
                </div>
                <dt className="mt-4 text-xl font-semibold leading-7 text-gray-900">
                  Planes de dieta y ejercicio integrados
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Obtén rutinas completas diseñadas para tus objetivos y estilo de
                  vida.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </article>

      {/* Testimonials Section */}
      <article className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Lo que dicen nuestros usuarios
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[
              {
                content: "FitFlow ha transformado mi rutina de ejercicios. Las recomendaciones son increíblemente precisas.",
                author: "María González",
                role: "Entusiasta del Fitness",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              },
              {
                content: "La IA realmente entiende mis necesidades y adapta los planes según mi progreso.",
                author: "Carlos Rodríguez",
                role: "Atleta Amateur",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              },
              {
                content: "La mejor app de fitness que he usado. El seguimiento es excepcional.",
                author: "Ana Martínez",
                role: "Instructora de Yoga",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="flex flex-col justify-between bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex-1">
                  <p className="text-lg leading-7 text-gray-600 mb-6">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <div className="text-base font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

export default HomePage;
