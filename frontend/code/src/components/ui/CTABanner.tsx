import { Link } from "react-router-dom";

function CTABanner() {
  return (
    <section className="py-16">
      <article className="relative bg-sky-500 text-white w-10/12 p-8 md:p-12 md:px-14 rounded-2xl mx-auto shadow-2xl">
        <main className="mb-16 lg:mb-0 md:w-11/12">
          <h2 className="uppercase text-sm font-bold mb-1 text-shadow-md">
            Esto es solo el comienzo
          </h2>
          <p className="lg:w-10/12 text-lg md:text-3xl font-semibold text-shadow-md">
            FitFlow es la app de entrenamiento y nutrición mejor valorada.
            Crecemos con vos y seguimos mejorando para ayudarte a lograr
            resultados reales y sostenibles.
          </p>
        </main>
        <Link
          className="md:text-lg font-bold absolute bottom-8 right-8 bg-blue-600 hover:bg-black py-3 px-6 rounded-full transition-colors duration-300 shadow-2xl"
          to="/login"
        >
          ¡Empieza ahora!
        </Link>
      </article>
    </section>
  );
}

export default CTABanner;
