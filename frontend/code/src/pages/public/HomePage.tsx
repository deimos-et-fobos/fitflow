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
import FAQs from "../../components/ui/FAQs";
import GridImage1 from "../../assets/grid1.webp";
import GridImage2 from "../../assets/grid2.webp";
import GridImage3 from "../../assets/grid3.webp";

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
                    className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Registrarse <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </article>

      <section className="w-10/12 mx-auto">
        <article className="py-6">
          <div className="mx-auto text-center lg:w-5/6">
            <h2 className="mb-12 text-2xl font-semibold text-gray-700">
              Descubre cómo nuestra plataforma transforma tus datos en acciones
              saludables y efectivas.
            </h2>
          </div>

          <article className="flex flex-col lg:flex-row gap-2 lg:gap-12">
            <div className="grid grid-cols-2 gap-4 w-10/12 mx-auto">
              <figure className="overflow-hidden h-fit rounded-2xl my-auto shadow-2xl">
                <img className="w-full object-cover" src={GridImage1} alt="" />
              </figure>
              <aside className="flex flex-col gap-4">
                <figure className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    className="w-full object-cover"
                    src={GridImage2}
                    alt=""
                  />
                </figure>
                <figure className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    className="w-full object-cover"
                    src={GridImage3}
                    alt=""
                  />
                </figure>
              </aside>
            </div>
            <div className="mx-auto mt-12">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold text-gray-900">
                    <div className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <BrainIcon />
                    </div>
                    Recomendaciones personalizadas con IA
                  </dt>
                  <dd className="text-base leading-7 text-gray-600">
                    Analizamos tus métricas y preferencias para generar planes
                    únicos y adaptados a ti.
                  </dd>
                </div>

                <div className="relative pl-16">
                  <dt className="text-base font-semibold text-gray-900">
                    <div className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <ChartExesIcon />
                    </div>
                    Seguimiento y ajuste continuo
                  </dt>
                  <dd className="text-base leading-7 text-gray-600">
                    Cada dato nuevo optimiza tus rutinas y mejora la precisión
                    de las sugerencias.
                  </dd>
                </div>

                <div className="relative pl-16">
                  <dt className="text-base font-semibold text-gray-900">
                    <div className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <BookCheckIcon />
                    </div>
                    Registro fácil de salud y hábitos
                  </dt>
                  <dd className="text-base leading-7 text-gray-600">
                    Ingresa peso, altura, comidas favoritas y más desde una
                    interfaz intuitiva.
                  </dd>
                </div>

                <div className="relative pl-16">
                  <dt className="text-base font-semibold text-gray-900">
                    <div className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <UtensilsIcon />
                    </div>
                    Planes de dieta y ejercicio integrados
                  </dt>
                  <dd className="text-base leading-7 text-gray-600">
                    Obtén rutinas completas diseñadas para tus objetivos y
                    estilo de vida.
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        </article>
      </section>
      <SliderSection />
      <Benefits />
      <FAQs />
      <MissionBanner />
      <CTABanner />
    </section>
  );
};

export default HomePage;
