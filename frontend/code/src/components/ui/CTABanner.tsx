import { Link } from "react-router-dom";

function CTABanner() {
  return (
    <article className="relative bg-sky-500 text-white w-10/12 p-12 px-14 rounded-2xl mx-auto">
      <main className="w-11/12">
        <h2 className="uppercase text-sm font-bold mb-2">
          Y eso es solo el comienzo
        </h2>
        <p className="w-10/12 text-3xl font-semibold">
          FitFlow es la app de entrenamiento y nutrición mejor valorada.
          Crecemos con vos y seguimos mejorando para ayudarte a lograr
          resultados reales y sostenibles.
        </p>
      </main>
      <Link
        className="text-lg font-bold absolute bottom-8 right-8 bg-blue-600 hover:bg-black py-3 px-6 rounded-full transition-colors duration-300"
        to="/login"
      >
        ¡Empieza ahora!
      </Link>
    </article>
  );
}

export default CTABanner;
