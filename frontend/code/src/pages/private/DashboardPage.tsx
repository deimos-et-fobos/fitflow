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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">¡Hola, {user?.name || "Usuario"}!</h1>
          <p className="mt-2 text-gray-600">Aquí está tu resumen de hoy</p>
        </motion.div>

        {/* Botón para generar plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button
            onClick={handleGeneratePlan}
            disabled={isLoading}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#2EC671] to-[#5DADE2] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2EC671] disabled:opacity-50"
          >
            {isLoading ? "Generando..." : "Generar Plan Diario"}
          </button>
        </motion.div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.color} rounded-xl p-6 shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-blue-600"}`}
                >
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plan Generado */}
        {plan && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Plan de Comidas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Plan de Comidas</h2>
                <span className="text-sm text-gray-500">{new Date(plan.date).toLocaleDateString()}</span>
              </div>
              <div className="space-y-4">
                {plan.meals &&
                  Object.entries(plan.meals).map(([mealType, mealDetails]) => (
                    <div key={mealType} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 hover:from-blue-100 hover:to-indigo-100 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium text-[#5DADE2] capitalize">{mealType}</h3>
                        <button
                          onClick={() => handleMarkMealComplete(mealType)}
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                        >
                          Completar
                        </button>
                      </div>
                      {Object.entries(mealDetails).map(([time, items]) => (
                        <div key={time} className="mb-2">
                          <p className="text-gray-700 font-medium">{time}</p>
                          <ul className="list-disc list-inside text-gray-600">
                            {items.map((item, index) => (
                              <li key={index} className="hover:text-gray-900 transition-colors">{item}</li>
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
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Plan de Ejercicios</h2>
                <button
                  onClick={handleMarkWorkoutComplete}
                  className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                  Completar Entrenamiento
                </button>
              </div>
              <div className="space-y-4">
                {plan.workouts && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 hover:from-green-100 hover:to-emerald-100 transition-colors">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm text-gray-500">Duración</p>
                        <p className="text-lg font-semibold text-gray-900">{plan.workouts.duration}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm text-gray-500">Calorías</p>
                        <p className="text-lg font-semibold text-gray-900">{plan.workouts.calories}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-[#5DADE2] mb-2">Calentamiento</h3>
                      <p className="text-gray-700 bg-white rounded-lg p-3 shadow-sm">{plan.workouts.warmup}</p>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-[#5DADE2] mb-2">Ejercicios</h3>
                      <div className="space-y-2">
                        {Object.entries(plan.workouts.exercises).map(([exercise, reps]) => (
                          <div key={exercise} className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-center">
                            <span className="text-gray-900">{exercise}</span>
                            <span className="text-blue-600 font-medium">{reps}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-[#5DADE2] mb-2">Estiramiento</h3>
                      <p className="text-gray-700 bg-white rounded-lg p-3 shadow-sm">{plan.workouts.stretching}</p>
                    </div>
                  </div>
                )}

                {/* Consejos */}
                {plan.tips && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 hover:from-purple-100 hover:to-pink-100 transition-colors">
                    <h3 className="text-lg font-medium text-[#5DADE2] mb-2">Consejos del Día</h3>
                    <ul className="space-y-2">
                      {plan.tips.map((tip, index) => (
                        <li key={index} className="bg-white rounded-lg p-3 shadow-sm text-gray-700 hover:text-gray-900 transition-colors">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actividad Reciente */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Actividad Reciente</h2>
              <button
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                onClick={() => navigate("/progress")}
              >
                Ver todo
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "Entrenamiento"
                          ? "bg-blue-100"
                          : activity.type === "Comida"
                          ? "bg-green-100"
                          : "bg-purple-100"
                      }`}
                    >
                      {activity.type === "Entrenamiento" ? (
                        <ChartBarIcon className="w-5 h-5 text-blue-600" />
                      ) : activity.type === "Comida" ? (
                        <FireIcon className="w-5 h-5 text-green-600" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.name}</p>
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
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Comunidad</h2>
              <button
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                onClick={() => navigate("/comunidad")}
              >
                Ver todo
              </button>
            </div>
            <div className="space-y-4">
              {communityData.map((item, index) => (
                <div key={index} className={`p-4 ${item.bg} rounded-lg`}>
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
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