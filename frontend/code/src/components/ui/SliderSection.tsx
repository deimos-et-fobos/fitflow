import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider1 from "../../assets/slider1.webp";
import Slider2 from "../../assets/slider2.webp";
import Slider3 from "../../assets/slider3.webp";
import Slider4 from "../../assets/slider4.webp";
import Slider5 from "../../assets/slider5.webp";
import Slider6 from "../../assets/slider6.webp";

function SliderSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="flex gap-4 md:gap-8 w-10/12 mx-auto py-28">
      <article>
        <h2 className="font-semibold text-lg md:text-2xl md:w-38">
          Empieza a ver resultados
        </h2>
        <div className="flex mt-12 gap-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="text-white text-xl bg-neutral-800 hover:bg-black rounded-full p-3 cursor-pointer"
            title="Siguiente"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="text-white text-xl bg-neutral-800 hover:bg-black rounded-full p-3 cursor-pointer"
            title="Anterior"
          >
            <FaChevronRight />
          </button>
        </div>
      </article>

      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        loop={true}
        slidesPerView={2}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <article>
            <figure className="overflow-hidden rounded-lg mb-4">
              <img className="w-full h-44 object-cover" src={Slider1} alt="" />
            </figure>
            <h2 className="text-lg mb-1 font-bold">Tu cambio empieza hoy</h2>
            <p className="text-sm font-semibold text-gray-600">
              Empezar es la parte más difícil, pero no estás solo. FitFlow te
              acompaña con planes reales, motivación constante y resultados que
              vas a poder ver y sentir.
            </p>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article>
            <figure className="overflow-hidden rounded-lg mb-4">
              <img className="w-full  h-44 object-cover" src={Slider2} alt="" />
            </figure>
            <h2 className="text-lg mb-1 font-bold">
              Entrenamientos que se adaptan a vos
            </h2>
            <p className="text-sm font-semibold text-gray-600">
              Diseñamos entrenamientos según tu nivel y tu ritmo de vida, para
              que puedas avanzar paso a paso y ver resultados sostenibles.
            </p>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article>
            <figure className="overflow-hidden rounded-lg mb-4">
              <img className="w-full h-44 object-cover" src={Slider3} alt="" />
            </figure>
            <h2 className="text-lg mb-1 font-bold">Comé bien, sentite mejor</h2>
            <p className="text-sm font-semibold text-gray-600">
              Nuestros planes nutricionales están pensados para que disfrutes la
              comida mientras cuidás tu energía, salud y bienestar general.
            </p>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article>
            <figure className="overflow-hidden rounded-lg mb-4">
              <img className="w-full h-44 object-cover" src={Slider4} alt="" />
            </figure>
            <h2 className="text-lg mb-1 font-bold">
              Resultados visibles, bienestar real
            </h2>
            <p className="text-sm font-semibold text-gray-600">
              Fortalecé tu cuerpo, mejorá tu postura y descubrí cómo el
              movimiento constante transforma no solo tu físico, sino también tu
              estado de ánimo.
            </p>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article>
            <figure className="overflow-hidden rounded-lg mb-4">
              <img className="w-full h-44 object-cover" src={Slider5} alt="" />
            </figure>
            <h2 className="text-lg mb-1 font-bold"> Movete donde estés</h2>
            <p className="text-sm font-semibold text-gray-600">
              Entrená desde casa, el parque o donde quieras, con rutinas
              efectivas, flexibles y pensadas para que no pierdas constancia.
            </p>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article>
            <figure className="overflow-hidden rounded-lg mb-4">
              <img className="w-full h-44 object-cover" src={Slider6} alt="" />
            </figure>
            <h2 className="text-lg mb-1 font-bold">Formá parte del cambio</h2>
            <p className="text-sm font-semibold text-gray-600">
              Sumate a una comunidad que entrena, se apoya y celebra los
              avances. En FitFlow no solo cambiás tu cuerpo, cambiás tu forma de
              vivir el bienestar.
            </p>
          </article>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default SliderSection;
