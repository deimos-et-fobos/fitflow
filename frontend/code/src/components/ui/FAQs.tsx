function FAQs() {
  return (
    <section className="py-12">
      <article className="flex flex-col-reverse lg:flex-row gap-12 w-10/12 mx-auto">
        <main className="flex flex-col gap-8">
          <article className="bg-[#2ecc71] rounded-2xl p-6 px-8 shadow-2xl">
            <h3 className="text-lg font-semibold mb-2">
              ¿Qué necesito para empezar a usar la aplicación?
            </h3>
            <p className="text-neutral-700">
              Solo tenés que crear una cuenta, completar tus objetivos y nivel
              actual. FitFlow te sugiere planes de entrenamiento y nutrición
              personalizados desde el primer día.
            </p>
          </article>

          <article className="bg-[#2ecc71] rounded-2xl p-6 px-8 shadow-2xl">
            <h3 className="text-lg font-semibold mb-2">
              ¿FitFlow me ayuda a seguir una dieta?
            </h3>
            <p className="text-neutral-700">
              Sí, además de entrenamientos, FitFlow ofrece planes nutricionales
              ajustados a tus metas: pérdida de peso, ganancia muscular o
              alimentación equilibrada. Todo adaptado a vos.
            </p>
          </article>
          <article className="bg-[#2ecc71] rounded-2xl p-6 px-8 shadow-2xl">
            <h3 className="text-lg font-semibold mb-2">
              ¿Cómo hago seguimiento de mis progresos?
            </h3>
            <p className="text-neutral-700">
              Desde tu perfil podés registrar medidas, peso, entrenamientos
              completados y más. Además, los gráficos de evolución te muestran
              el avance semana a semana.
            </p>
          </article>
          <article className="bg-[#2ecc71] rounded-2xl p-6 px-8 shadow-2xl">
            <h3 className="text-lg font-semibold mb-2">
              ¿Puedo usar FitFlow si entreno en casa?
            </h3>
            <p className="text-neutral-700">
              ¡Claro! Nuestra app incluye rutinas adaptadas tanto para gimnasio
              como para casa. Solo indicá tu disponibilidad y el equipo que
              tenés, y armamos tu plan ideal.
            </p>
          </article>
        </main>
        <header className="w-4/5 md:w-3/5">
          <h2 className="mb-4 text-3xl">Preguntas frecuentes</h2>
          <p className="text-gray-600">
            Descubrí cómo potenciar tus entrenamientos y simplificar tu progreso
            con planes personalizados, seguimiento diario y resultados reales
          </p>
        </header>
      </article>
    </section>
  );
}

export default FAQs;
