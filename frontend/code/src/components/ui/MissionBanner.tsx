import Mission1 from "../../assets/mission1.jpg";
import Mission2 from "../../assets/mission2.webp";
import Mission3 from "../../assets/mission3.webp";
function MissionBanner() {
  return (
    <section className="mt-12 w-10/12 mx-auto rounded-2xl p-8 px-10 shadow-2xl">
      <header className="mb-8">
        <h2 className=" uppercase font-bold text-lg mb-2">Nuestra Misión</h2>
        <p className="lg:text-xl lg:w-9/12 font-semibold">
          FitFlow es el aliado confiable en el camino hacia una vida más
          saludable. Hemos diseñado una plataforma inteligente que acompaña
          tanto a principiantes como a atletas de alto rendimiento en la
          conquista de sus metas. Con planes personalizados, evolución continua
          y enfoque en el bienestar real, FitFlow está transformando el futuro
          del entrenamiento.
        </p>
      </header>
      <main className="grid md:grid-cols-3 gap-4 md:gap-6">
        <figure className="overflow-hidden rounded-xl shadow-2xl">
          <img className="w-full h-full object-cover" src={Mission1} alt="" />
        </figure>
        <figure className="overflow-hidden rounded-xl shadow-2xl">
          <img className="w-full h-full object-cover" src={Mission2} alt="" />
        </figure>
        <figure className="hidden md:block overflow-hidden rounded-xl shadow-2xl">
          <img className="w-full h-full object-cover" src={Mission3} alt="" />
        </figure>
      </main>
    </section>
  );
}

export default MissionBanner;
