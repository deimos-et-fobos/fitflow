import React, { useState } from "react";
import { motion } from "framer-motion";
import Avatar from "../../components/ui/Avatar";

const publicaciones = [
  {
    id: 1,
    nombre: "Alex",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    mensaje: "¡Completé 5 entrenamientos esta semana! 💪",
    tiempo: "Hace 15 min",
    color: "bg-green-50 border-green-200",
    icon: (
      <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    id: 2,
    nombre: "Sara",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    mensaje: "¡Alcancé mi meta de pasos! 🚶‍♀️",
    tiempo: "Hace 30 min",
    color: "bg-orange-50 border-orange-200",
    icon: (
      <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M13 16h-1v-4h-1m1-4h.01" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    id: 3,
    nombre: "Luis",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    mensaje: "¡Probé una nueva rutina de HIIT y me encantó! 🔥",
    tiempo: "Hace 1 h",
    color: "bg-blue-50 border-blue-200",
    icon: (
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
  },
];

const reacciones = [
  { icon: "👍", label: "Me gusta" },
  { icon: "❤️", label: "Me encanta" },
  { icon: "🔥", label: "Motiva" },
  { icon: "🎉", label: "Felicidades" },
];

const foros = [
  {
    icon: (
      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 20h9" />
        <path d="M12 4h9" />
        <path d="M4 9h16v6H4z" />
      </svg>
    ),
    nombre: "Nuevos miembros",
    desc: "Preséntate y conoce a la comunidad."
  },
  {
    icon: (
      <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 20h9" />
        <path d="M12 4h9" />
        <path d="M4 9h16v6H4z" />
      </svg>
    ),
    nombre: "Consejos de entrenamiento",
    desc: "Comparte y aprende rutinas y tips."
  },
  {
    icon: (
      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
    nombre: "Recetas saludables",
    desc: "Comparte tus platillos favoritos."
  },
];

export default function Comunidad() {
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [publicacionesState, setPublicacionesState] = useState(publicaciones);

  const handlePublicar = () => {
    if (nuevoMensaje.trim() === "") return;
    setPublicacionesState([
      {
        id: Date.now(),
        nombre: "Tú",
        avatar: "https://randomuser.me/api/portraits/men/99.jpg",
        mensaje: nuevoMensaje,
        tiempo: "Ahora",
        color: "bg-purple-50 border-purple-200",
        icon: (
          <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l2 2 4-4" />
          </svg>
        ),
      },
      ...publicacionesState,
    ]);
    setNuevoMensaje("");
  };

  return (
    <div className="p-4 pb-24 bg-gradient-to-b from-white via-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Comunidad</h1>
      {/* Crear nueva publicación */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-col sm:flex-row items-center gap-4 border border-blue-100">
        <img src="https://randomuser.me/api/portraits/men/99.jpg" alt="Tu avatar" className="w-12 h-12 rounded-full object-cover border-2 border-blue-200" />
        <input
          type="text"
          placeholder="¿Qué quieres compartir hoy?"
          className="flex-1 rounded-full border border-blue-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-gray-700"
          value={nuevoMensaje}
          onChange={e => setNuevoMensaje(e.target.value)}
          maxLength={180}
        />
        <button
          onClick={handlePublicar}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors"
        >
          Publicar
        </button>
      </div>
      {/* Publicaciones */}
      <div className="space-y-6 mb-8">
        {publicacionesState.map((pub, i) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 80 }}
            className={`flex items-start border ${pub.color} rounded-2xl p-5 shadow-md gap-4`}
          >
            <img src={pub.avatar} alt={pub.nombre} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-900">{pub.nombre}</span>
                {pub.icon}
                <span className="text-xs text-gray-400 ml-2">{pub.tiempo}</span>
              </div>
              <p className="text-gray-800 text-base mb-2">{pub.mensaje}</p>
              <div className="flex gap-2 mt-1">
                {reacciones.map((r, idx) => (
                  <motion.button
                    key={r.label}
                    whileTap={{ scale: 1.3 }}
                    className="text-xl px-2 py-1 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label={r.label}
                  >
                    {r.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Foros destacados */}
      <h2 className="text-lg font-semibold mb-2 text-blue-900">Foros destacados</h2>
      <ul className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {foros.map((foro) => (
          <li className="flex items-start bg-white rounded-xl shadow p-4 border border-blue-100" key={foro.nombre}>
            {foro.icon}
            <div>
              <span className="text-blue-900 font-semibold block">{foro.nombre}</span>
              <span className="text-gray-500 text-sm block">{foro.desc}</span>
            </div>
          </li>
        ))}
      </ul>
      {/* Ranking semanal */}
      <div className="flex items-center text-orange-500 font-semibold bg-white rounded-xl shadow p-4 border border-orange-100">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 17l-5 3 1.9-5.6L4 10.5l5.7-.4L12 5l2.3 5.1 5.7.4-4.9 4.9L17 20z" />
        </svg>
        Ranking semanal: <span className="ml-2 text-orange-600">#1 Sara</span>
      </div>
    </div>
  );
} 