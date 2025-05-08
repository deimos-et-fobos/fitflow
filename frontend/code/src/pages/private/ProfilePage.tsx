import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/ui/Avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Íconos SVG
const ClockIcon = (
  <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const GearIcon = (
  <svg width="20" height="20" fill="none" stroke="#3498DB" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const HeartIcon = (
  <svg width="20" height="20" fill="none" stroke="#E67E22" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const ProgressCircle = ({ progress = 75, size = 40 }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = () => {
      if (start < progress) {
        start += 1;
        setAnimatedProgress(start);
        requestAnimationFrame(step);
      } else {
        setAnimatedProgress(progress);
      }
    };
    step();
  }, [progress]);

  const radius = size;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="relative flex justify-center items-center my-4">
      <svg width={size * 2} height={size * 2}>
        <circle
          cx={size}
          cy={size}
          r={normalizedRadius}
          stroke="#E0E0E0"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size}
          cy={size}
          r={normalizedRadius}
          stroke="#2ECC71"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
      <motion.span
        className="absolute text-xl font-bold text-[#2C3E50]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
      >
        {animatedProgress}%
      </motion.span>
    </div>
  );
};

const fadeInCascade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 }
  }),
};

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow pb-16">
        <div className="flex flex-col min-h-screen bg-white">
          <main className="flex-1 flex flex-col items-center p-4 pb-32">
            <motion.h1
              className="text-xl font-bold text-[#2C3E50] mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Perfil
            </motion.h1>

            {/* Avatar y Nombre */}
            <motion.section
              className="flex flex-col items-center mb-4"
              initial="hidden"
              animate="visible"
              variants={fadeInCascade}
              custom={0}
            >
              <div className="bg-[#E0E0E0] rounded-full w-20 h-20 flex items-center justify-center mb-2">
                <Avatar src={user?.photoUrl || "/assets/user-placeholder.png"} size={40} />
              </div>
              <motion.h2
                className="text-lg font-bold text-[#2C3E50]"
                variants={fadeInCascade}
                custom={1}
              >
                {user?.name || "Alex"}
              </motion.h2>
            </motion.section>

            {/* Opciones */}
            <section className="flex flex-col gap-3 w-full max-w-xs mb-4">
              <motion.button
                onClick={() => navigate("/profile/activity")}
                className="flex items-center gap-2 w-full bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:bg-gray-50"
                variants={fadeInCascade}
                custom={2}
                initial="hidden"
                animate="visible"
              >
                {ClockIcon}
                <span className="text-[#2C3E50] font-medium text-sm">Historial</span>
              </motion.button>
              <motion.button
                onClick={() => navigate("/profile/edit")}
                className="flex items-center gap-2 w-full bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:bg-gray-50"
                variants={fadeInCascade}
                custom={3}
                initial="hidden"
                animate="visible"
              >
                {GearIcon}
                <span className="text-[#2C3E50] font-medium text-sm">Configuración</span>
              </motion.button>
              <motion.button
                onClick={() => navigate("/profile/health")}
                className="flex items-center gap-2 w-full bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:bg-gray-50"
                variants={fadeInCascade}
                custom={4}
                initial="hidden"
                animate="visible"
              >
                {HeartIcon}
                <span className="text-[#E67E22] font-medium text-sm">Datos de Salud</span>
              </motion.button>
            </section>

            {/* Progreso General */}
            <motion.section
              className="flex flex-col items-center"
              initial="hidden"
              animate="visible"
              variants={fadeInCascade}
              custom={5}
            >
              <h3 className="text-base font-semibold text-[#2C3E50] mb-2">Tu progreso General</h3>
              <ProgressCircle progress={75} size={32} />
            </motion.section>
          </main>
        </div>
      </main>
      <footer className="w-full bg-white border-t border-gray-200 py-2 text-center text-xs text-gray-500">
        © 2025 FitFlow. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default ProfilePage;