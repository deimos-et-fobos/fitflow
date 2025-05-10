import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/ui/Avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getRecentProgress } from "../../services/planService";
import { getProfile } from "../../services/authService";
import { toast } from "react-toastify";

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

const TrophyIcon = (
  <svg width="20" height="20" fill="none" stroke="#F1C40F" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
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
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    workoutsCompleted: 0,
    mealsFollowed: 0,
    totalCalories: 0,
    streak: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener datos actualizados del perfil
        const updatedUser = await getProfile(localStorage.getItem('access_token') || '');
        setUser(updatedUser);

        // Obtener estadísticas
        const progress = await getRecentProgress();
        const stats = progress.reduce((acc: any, curr: any) => {
          if (curr.workout_done) acc.workoutsCompleted++;
          if (curr.meals_followed) acc.mealsFollowed++;
          if (curr.calories_burned) acc.totalCalories += parseInt(curr.calories_burned);
          return acc;
        }, { workoutsCompleted: 0, mealsFollowed: 0, totalCalories: 0, streak: 0 });

        // Calcular racha
        let currentStreak = 0;
        let lastDate = new Date();
        for (const record of progress) {
          const recordDate = new Date(record.date);
          const diffDays = Math.floor((lastDate.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1 && (record.workout_done || record.meals_followed)) {
            currentStreak++;
            lastDate = recordDate;
          } else {
            break;
          }
        }
        stats.streak = currentStreak;

        setStats(stats);
      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
        toast.error("Error al cargar los datos del perfil");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  // Redirigir al login si no hay usuario
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ECC71]"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-[#2EC671] to-[#5DADE2] p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar
                    src={user.photoUrl || "/assets/user-placeholder.png"}
                    size={80}
                    className="border-4 border-white"
                  />
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                    <svg width="20" height="20" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 15v-3m0 0V9m0 3h3m-3 0H9" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-white/80">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/profile/edit")}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors"
              >
                Editar Perfil
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Entrenamientos</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{stats.workoutsCompleted}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg width="24" height="24" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Comidas</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{stats.mealsFollowed}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg width="24" height="24" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Calorías</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{stats.totalCalories}</p>
                </div>
                <div className="bg-orange-100 p-2 rounded-lg">
                  <svg width="24" height="24" fill="none" stroke="#F39C12" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Racha</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{stats.streak} días</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <svg width="24" height="24" fill="none" stroke="#F1C40F" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l3.293 3.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-3.293-3.293a1 1 0 010-1.414l10-10a1 1 0 011.414 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Opciones */}
          <div className="p-6 space-y-4">
            <motion.button
              onClick={() => navigate("/profile/activity")}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
              variants={fadeInCascade}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  {ClockIcon}
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#2C3E50]">Historial de Actividad</p>
                  <p className="text-sm text-gray-500">Ver tu progreso y actividades</p>
                </div>
              </div>
              <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => navigate("/profile/health")}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
              variants={fadeInCascade}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  {HeartIcon}
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#2C3E50]">Datos de Salud</p>
                  <p className="text-sm text-gray-500">Ver tus métricas y progreso</p>
                </div>
              </div>
              <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => navigate("/profile/settings")}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
              variants={fadeInCascade}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  {GearIcon}
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#2C3E50]">Configuración</p>
                  <p className="text-sm text-gray-500">Ajustar preferencias y cuenta</p>
                </div>
              </div>
              <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Progreso General */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Progreso General</h3>
              <div className="flex items-center justify-center">
                <ProgressCircle progress={calculateOverallProgress(stats)} size={40} />
              </div>
              <p className="text-center text-gray-500 mt-4">
                {getProgressMessage(calculateOverallProgress(stats))}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Función auxiliar para calcular el progreso general
const calculateOverallProgress = (stats: any): number => {
  const totalActivities = stats.workoutsCompleted + stats.mealsFollowed;
  const maxActivities = 14; // 7 días * 2 actividades (entrenamiento + comida)
  return Math.min(Math.round((totalActivities / maxActivities) * 100), 100);
};

// Función auxiliar para obtener mensaje de progreso
const getProgressMessage = (progress: number): string => {
  if (progress >= 90) return "¡Excelente trabajo! Estás superando tus objetivos";
  if (progress >= 70) return "¡Sigue así! Estás cerca de alcanzar tus objetivos";
  if (progress >= 50) return "Vas por buen camino, pero aún hay espacio para mejorar";
  return "Comienza a registrar tus actividades para ver tu progreso";
};

export default ProfilePage;