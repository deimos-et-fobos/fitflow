import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  BookCheckIcon,
  BrainIcon,
  ChartExesIcon,
  UtensilsIcon,
} from "../../components/ui/Icons";
import MissionBanner from "../../components/ui/MissionBanner";
import SliderSection from "../../components/ui/SliderSection";
import CTABanner from "../../components/ui/CTABanner";
import Benefits from "../../components/ui/Benefits";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-white">
      <article className="relative isolate px-6 pt-2 lg:px-8">
        <div className="mx-auto max-w-2xl py-12 sm:py-14 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Bienvenido a FitFlow
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Tu bienestar, potenciado por la inteligencia artificial. Registra
              tus datos de salud y recibe planes de alimentación y ejercicio
              personalizados que se adaptan en tiempo real a tu progreso.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Ir al Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Registrarse <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </article>

      <MissionBanner />
      <SliderSection />
      <CTABanner />
      <Benefits />
      <article className="py-8 lg:pb-12">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Todo lo que necesitas para empezar
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Descubre cómo nuestra plataforma transforma tus datos en acciones
            saludables y efectivas.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <BrainIcon />
                </div>
                Recomendaciones personalizadas con IA
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Analizamos tus métricas y preferencias para generar planes
                únicos y adaptados a ti.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <ChartExesIcon />
                </div>
                Seguimiento y ajuste continuo
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Cada dato nuevo optimiza tus rutinas y mejora la precisión de
                las sugerencias.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <BookCheckIcon />
                </div>
                Registro fácil de salud y hábitos
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Ingresa peso, altura, comidas favoritas y más desde una interfaz
                intuitiva.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <UtensilsIcon />
                </div>
                Planes de dieta y ejercicio integrados
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Obtén rutinas completas diseñadas para tus objetivos y estilo de
                vida.
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  );
};

export default HomePage;
