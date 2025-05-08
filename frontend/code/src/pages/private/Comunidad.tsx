import React from "react";
import { motion } from "framer-motion";
import Avatar from "../../components/ui/Avatar";

const publicaciones = [
  {
    id: 1,
    nombre: "Alex",
    mensaje: "¡Completó 5 entrenamientos!",
    tiempo: "Hace 15 min",
    color: "bg-green-100 border-green-300",
    icon: (
      <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    id: 2,
    nombre: "Sara",
    mensaje: "¡Alcanzó su meta de pasos!",
    tiempo: "Hace 30 min",
    color: "bg-orange-100 border-orange-300",
    icon: (
      <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M13 16h-1v-4h-1m1-4h.01" />
        <circle cx="12" cy="12" r="10" />
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
  },
];

export default function Comunidad() {
  return (
    <div className="p-4 pb-24 bg-gradient-to-b from-white via-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Comunidad</h1>
      {/* Publicaciones */}
      <div className="space-y-4 mb-6">
        {publicaciones.map((pub, i) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
            className={`flex items-center border ${pub.color} rounded-xl p-3 shadow-sm`}
          >
            <Avatar size={44} />
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-900">{pub.nombre}</span>
                {pub.icon}
              </div>
              <p className="text-gray-700 text-sm">{pub.mensaje}</p>
              <span className="text-xs text-gray-400">{pub.tiempo}</span>
              <div className="flex gap-2 mt-2">
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
      <button className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg py-2 font-semibold mb-6 shadow-md hover:from-blue-600 hover:to-blue-500 transition-colors">
        <span className="mr-2">✍️</span> Publicar
      </button>
      {/* Foros destacados */}
      <h2 className="text-lg font-semibold mb-2 text-blue-900">Foros destacados</h2>
      <ul className="mb-6">
        {foros.map((foro) => (
          <li className="flex items-center mb-2" key={foro.nombre}>
            {foro.icon}
            <span className="text-blue-900">{foro.nombre}</span>
          </li>
        ))}
      </ul>
      {/* Ranking semanal */}
      <div className="flex items-center text-orange-500 font-semibold bg-white rounded-xl shadow p-3">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 17l-5 3 1.9-5.6L4 10.5l5.7-.4L12 5l2.3 5.1 5.7.4-4.9 4.9L17 20z" />
        </svg>
        Ranking semanal
      </div>
    </div>
  );
} 