import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { toast, ToastContentProps } from "react-toastify";
import { createPlan, getRecentProgress, getCurrentPlan, updatePlanProgress } from "../../services/planService";
import { Plan, RecentActivity } from "../../types/user.types";
import {
  ChartBarIcon,
  ClockIcon,
  FireIcon,
  HeartIcon,
  TrophyIcon,
  UserGroupIcon,
} from "../../components/ui/Icons";

interface CustomToastProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const CustomToast = ({ message, action }: CustomToastProps) => (
  <div className="flex items-center space-x-2">
    <span>{message}</span>
    {action && (
      <button className="text-blue-600 hover:text-blue-800 font-medium" onClick={action.onClick}>
        {action.label}
      </button>
    )}
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState([
    {
      title: "Calorías Quemadas",
      value: "0",
      icon: <FireIcon className="w-6 h-6 text-orange-500" />,
      change: "+12%",
      color: "bg-orange-50",
    },
    {
      title: "Minutos Activos",
      value: "0",
      icon: <ClockIcon className="w-6 h-6 text-blue-500" />,
      change: "+8%",
      color: "bg-blue-50",
    },
    {
      title: "IMC",
      value: "0",
      icon: <HeartIcon className="w-6 h-6 text-red-500" />,
      change: "Normal",
      color: "bg-red-50",
    },
    {
      title: "Objetivos Completados",
      value: "0/5",
      icon: <TrophyIcon className="w-6 h-6 text-yellow-500" />,
      change: "+0",
      color: "bg-yellow-50",
    },
  ]);

  const communityData = [
    {
      title: "Nuevos Miembros",
      description: "5 personas se unieron hoy",
      icon: <UserGroupIcon className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Logros Desbloqueados",
      description: "3 nuevos logros disponibles",
      icon: <TrophyIcon className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
  ];

  useEffect(() => {
    const fetchRecentProgress = async () => {
      try {
        const progress = await getRecentProgress();
        const activities = progress.length
          ? progress.map((item: any) => ({
              type: item.workout_done ? "Entrenamiento" : item.meals_followed ? "Comida" : "Medición",
              name: item.workout_done ? "Entrenamiento Diario" : item.meals_followed ? "Comida Diaria" : "Peso",
              calories: item.workout_done ? "300" : item.meals_followed ? "400" : undefined,
              value: item.weight_kg ? `${item.weight_kg} kg` : undefined,
              time: `Hace ${Math.floor(Math.random() * 5 + 1)} horas`,
            }))
          : [
              { type: "Entrenamiento", name: "Cardio Intenso", duration: "30 min", calories: "320", time: "Hace 2 horas" },
              { type: "Comida", name: "Almuerzo Saludable", calories: "450", time: "Hace 3 horas" },
              { type: "Medición", name: "Peso Corporal", value: "75.5 kg", time: "Hace 5 horas" },
            ];
        setRecentActivities(activities.slice(0, 3));

        const latestProgress = progress[0] || {};
        setStats([
          {
            title: "Calorías Quemadas",
            value: latestProgress.calories_burned || plan?.workouts?.calories || "0",
            icon: <FireIcon className="w-6 h-6 text-orange-500" />,
            change: "+12%",
            color: "bg-orange-50",
          },
          {
            title: "Minutos Activos",
            value: latestProgress.minutes_active || plan?.workouts?.duration?.split(" ")[0] || "0",
            icon: <ClockIcon className="w-6 h-6 text-blue-500" />,
            change: "+8%",
            color: "bg-blue-50",
          },
          {
            title: "IMC",
            value: latestProgress.bmi || plan?.bmi?.toString() || "0",
            icon: <HeartIcon className="w-6 h-6 text-red-500" />,
            change: latestProgress.bmi_status || plan?.bmi_status || "Normal",
            color: "bg-red-50",
          },
          {
            title: "Objetivos Completados",
            value: latestProgress.goals_completed || "3/5",
            icon: <TrophyIcon className="w-6 h-6 text-yellow-500" />,
            change: "+2",
            color: "bg-yellow-50",
          },
        ]);
      } catch (error) {
        toast.error("Error al cargar actividades recientes");
        setRecentActivities([
          { type: "Entrenamiento", name: "Cardio Intenso", duration: "30 min", calories: "320", time: "Hace 2 horas" },
          { type: "Comida", name: "Almuerzo Saludable", calories: "450", time: "Hace 3 horas" },
          { type: "Medición", name: "Peso Corporal", value: "75.5 kg", time: "Hace 5 horas" },
        ]);
      }
    };
    fetchRecentProgress();
  }, [plan]);

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const currentPlan = await getCurrentPlan();
        if (currentPlan) {
          setPlan(currentPlan);
        }
      } catch (error) {
        console.error("Error al cargar el plan actual:", error);
      }
    };
    fetchCurrentPlan();
  }, []);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    try {
      const newPlan = await createPlan();
      if (!newPlan || typeof newPlan !== "object") {
        throw new Error("Respuesta del servidor inválida");
      }
      setPlan(newPlan);
      toast.success("¡Plan generado exitosamente!");
    } catch (error: any) {
      const message =
        error.message === "Ya existe un plan para hoy"
          ? "Ya tienes un plan para hoy. Revisa tu plan actual."
          : error.message === "No autenticado"
          ? "Por favor, inicia sesión para generar un plan."
          : "Error al generar el plan. Intenta de nuevo.";
      toast.error(({ closeToast }: ToastContentProps) => (
        <CustomToast
          message={message}
          action={
            error.message === "Ya existe un plan para hoy"
              ? { label: "Ver plan", onClick: () => navigate("/plan") }
              : undefined
          }
        />
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkMealComplete = async (mealType: string) => {
    if (!plan) return;
    try {
      const updatedPlan = await updatePlanProgress(plan.id, {
        meals_followed: true
      });
      setPlan(updatedPlan);
      toast.success(`¡${mealType} completada!`);
    } catch (error) {
      toast.error("Error al actualizar el progreso");
    }
  };

  const handleMarkWorkoutComplete = async () => {
    if (!plan) return;
    try {
      const updatedPlan = await updatePlanProgress(plan.id, {
        workout_done: true
      });
      setPlan(updatedPlan);
      toast.success("¡Entrenamiento completado!");
    } catch (error) {
      toast.error("Error al actualizar el progreso");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero con imagen motivacional */}
      <div className="relative w-full h-56 md:h-64 lg:h-80 flex items-center justify-center overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
          alt="Fitness Hero"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">¡Hola, {user?.name || "Usuario"}!</h1>
          <p className="text-lg md:text-2xl text-blue-100 font-medium drop-shadow mb-2">Este es tu espacio FitFlow</p>
          <p className="text-base md:text-lg text-blue-200 max-w-2xl mx-auto">Visualiza tu progreso, tus planes y la energía de la comunidad. ¡Hoy es un gran día para avanzar!</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón para generar plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-center">
          <button
            onClick={handleGeneratePlan}
            disabled={isLoading}
            className="py-4 px-8 rounded-2xl bg-gradient-to-r from-[#2EC671] to-[#5DADE2] text-white text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC671] disabled:opacity-50"
          >
            {isLoading ? "Generando..." : "Generar Plan Diario"}
          </button>
        </motion.div>
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden ${stat.color} rounded-3xl p-8 shadow-xl group hover:scale-105 transition-transform`}
            >
              <div className="absolute right-4 top-4 opacity-20 group-hover:opacity-40 text-7xl pointer-events-none">
                {stat.icon}
              </div>
              <div className="relative z-10">
                <p className="text-lg font-semibold text-gray-700 mb-1">{stat.title}</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</p>
                <span className={`text-base font-bold ${stat.change.startsWith("+") ? "text-green-600" : "text-blue-600"}`}>{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plan Generado */}
        {plan && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Plan de Comidas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-100 rounded-3xl shadow-2xl p-8 hover:shadow-2xl transition-shadow overflow-hidden"
            >
              <img src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' alt='Comida saludable' className='absolute right-0 top-0 w-40 h-40 object-cover opacity-20 rounded-3xl pointer-events-none hidden md:block'/>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-blue-900 flex items-center gap-2">
                  <span className="inline-block bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mr-2">🍽️</span>
                  Plan de Comidas
                </h2>
                <span className="text-sm text-blue-500 font-semibold bg-blue-100 px-3 py-1 rounded-full">{new Date(plan.date).toLocaleDateString()}</span>
              </div>
              <div className="space-y-6">
                {plan.meals &&
                  Object.entries(plan.meals).map(([mealType, mealDetails]) => (
                    <div key={mealType} className="bg-white/80 rounded-2xl p-5 shadow group hover:bg-blue-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-blue-700 capitalize flex items-center gap-2">
                          {mealType === 'desayuno' && '🥣'}
                          {mealType === 'almuerzo' && '🥗'}
                          {mealType === 'cena' && '🍲'}
                          {mealType === 'snack' && '🍎'}
                          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                        </h3>
                        <button
                          onClick={() => handleMarkMealComplete(mealType)}
                          className="px-4 py-1 text-sm bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-semibold shadow hover:from-green-500 hover:to-green-700 transition-colors"
                        >
                          Completar
                        </button>
                      </div>
                      {Object.entries(mealDetails).map(([time, items]) => (
                        <div key={time} className="mb-2">
                          <p className="text-blue-600 font-semibold mb-1">{time}</p>
                          <ul className="list-disc list-inside text-gray-700 ml-4">
                            {items.map((item, index) => (
                              <li key={index} className="hover:text-blue-900 transition-colors">{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Plan de Ejercicios */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-gradient-to-br from-green-50 via-white to-emerald-100 rounded-3xl shadow-2xl p-8 hover:shadow-2xl transition-shadow overflow-hidden"
            >
              <img src='https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80' alt='Entrenamiento' className='absolute left-0 top-0 w-40 h-40 object-cover opacity-20 rounded-3xl pointer-events-none hidden md:block'/>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-green-900 flex items-center gap-2">
                  <span className="inline-block bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-bold mr-2">🏋️‍♂️</span>
                  Plan de Ejercicios
                </h2>
                <button
                  onClick={handleMarkWorkoutComplete}
                  className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-bold shadow hover:from-green-500 hover:to-green-700 transition-colors"
                >
                  Completar Entrenamiento
                </button>
              </div>
              <div className="space-y-6">
                {plan.workouts && (
                  <div className="bg-white/80 rounded-2xl p-5 shadow group hover:bg-green-50 transition-colors">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-100 rounded-lg p-3 shadow-sm flex flex-col items-center">
                        <span className="text-green-600 text-2xl font-bold">⏱️</span>
                        <p className="text-xs text-gray-500">Duración</p>
                        <p className="text-lg font-semibold text-gray-900">{plan.workouts.duration}</p>
                      </div>
                      <div className="bg-orange-100 rounded-lg p-3 shadow-sm flex flex-col items-center">
                        <span className="text-orange-500 text-2xl font-bold">🔥</span>
                        <p className="text-xs text-gray-500">Calorías</p>
                        <p className="text-lg font-semibold text-gray-900">{plan.workouts.calories}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">🧘‍♂️ Calentamiento</h3>
                      <p className="text-gray-700 bg-white rounded-lg p-3 shadow-sm">{plan.workouts.warmup}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">🏃‍♂️ Ejercicios</h3>
                      <div className="space-y-2">
                        {Object.entries(plan.workouts.exercises).map(([exercise, reps]) => (
                          <div key={exercise} className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-center border-l-4 border-green-400">
                            <span className="text-gray-900 font-semibold">{exercise}</span>
                            <span className="text-green-600 font-bold">{reps}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">🤸‍♂️ Estiramiento</h3>
                      <p className="text-gray-700 bg-white rounded-lg p-3 shadow-sm">{plan.workouts.stretching}</p>
                    </div>
                  </div>
                )}
                {/* Consejos */}
                {plan.tips && (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 shadow group hover:from-purple-200 hover:to-pink-200 transition-colors mt-4">
                    <h3 className="text-lg font-bold text-pink-700 mb-3 flex items-center gap-2">💡 Consejos del Día</h3>
                    <ul className="space-y-2">
                      {plan.tips.map((tip, index) => (
                        <li key={index} className="bg-white rounded-lg p-3 shadow-sm text-gray-700 hover:text-gray-900 transition-colors border-l-4 border-pink-400">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Actividad Reciente y Comunidad */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actividad Reciente */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-blue-900 flex items-center gap-2">📈 Actividad Reciente</h2>
              <button
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                onClick={() => navigate("/progress")}
              >
                Ver todo
              </button>
            </div>
            <div className="space-y-5">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-5 bg-white/80 rounded-2xl shadow group hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg ${
                        activity.type === "Entrenamiento"
                          ? "bg-blue-200 text-blue-700"
                          : activity.type === "Comida"
                          ? "bg-green-200 text-green-700"
                          : "bg-purple-200 text-purple-700"
                      }`}
                    >
                      {activity.type === "Entrenamiento" ? "🏋️‍♂️" : activity.type === "Comida" ? "🍽️" : "📏"}
                    </div>
                    <div>
                      <p className="font-bold text-blue-900 text-lg">{activity.name}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.duration && <p className="text-sm text-gray-600">{activity.duration}</p>}
                    {activity.calories && <p className="text-sm text-gray-600">{activity.calories} cal</p>}
                    {activity.value && <p className="text-sm text-gray-600">{activity.value}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comunidad */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-pink-50 via-white to-purple-100 rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-purple-900 flex items-center gap-2">🤝 Comunidad</h2>
              <button
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                onClick={() => navigate("/comunidad")}
              >
                Ver todo
              </button>
            </div>
            <div className="space-y-5">
              {communityData.map((item, index) => (
                <div key={index} className={`p-5 rounded-2xl shadow bg-white/80 flex items-center gap-4 border-l-4 ${index === 0 ? 'border-blue-400' : 'border-green-400'}`}>
                  <div className="text-3xl">
                    {index === 0 ? '🆕' : '🏆'}
                  </div>
                  <div>
                    <p className="font-bold text-purple-900 text-lg">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;