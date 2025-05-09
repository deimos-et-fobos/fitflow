import { AppleIcon, BicepsIcon, DumbbellIcon } from "./Icons";
import BenefitsImg from "../../assets/benefits.webp";

function Benefits() {
  return (
    <section className="py-12">
      <article className="w-10/12 mx-auto">
        <header className="flex justify-between items-center py-8">
          <h2 className="text-xl md:text-3xl font-semibold">
            Nuestros beneficios
          </h2>
          <p className="w-2/4 lg:w-1/4 font-semibold text-right text-sm text-gray-600">
            Mejorá tu bienestar físico con herramientas prácticas y efectivas
          </p>
        </header>
        <main className="flex flex-col-reverse md:flex-row gap-12">
          <article className="flex flex-col justify-center gap-8 lg:w-3/8 mx-auto">
            <article className="flex items-center gap-4">
              <span className="bg-black text-white w-10 h-10 p-2 rounded-full">
                <BicepsIcon />
              </span>
              <main>
                <h3 className="mb-1 font-bold">Fuerza y resistencia real</h3>
                <p className="text-sm text-gray-600">
                  Entrenamientos diseñados para desafiarte, mejorar tu condición
                  física y ayudarte a alcanzar todo tu potencial.
                </p>
              </main>
            </article>

            <article className="flex items-center gap-4">
              <span className="bg-black text-white w-10 h-10 p-2 rounded-full">
                <DumbbellIcon />
              </span>
              <main>
                <h3 className="mb-1 font-bold">Rutinas personalizadas</h3>
                <p className="text-sm text-gray-600">
                  Ajustá tus entrenamientos a tus objetivos con planes flexibles
                  que se adaptan a tu progreso y estilo de vida.
                </p>
              </main>
            </article>

            <article className="flex items-center gap-4">
              <span className="bg-black text-white w-10 h-10 p-2 rounded-full">
                <AppleIcon />
              </span>
              <main>
                <h3 className="mb-1 font-bold">Nutrición inteligente</h3>
                <p className="text-sm text-gray-600">
                  Recibí planes alimenticios simples, balanceados y efectivos
                  que acompañan tu entrenamiento y te acercan a tu meta.
                </p>
              </main>
            </article>
          </article>
          <figure className="w-8/12 rounded-2xl overflow-hidden shadow-2xl mx-auto">
            <img
              className="w-full h-full object-cover"
              src={BenefitsImg}
              alt=""
            />
          </figure>
        </main>
      </article>
    </section>
  );
}

export default Benefits;
