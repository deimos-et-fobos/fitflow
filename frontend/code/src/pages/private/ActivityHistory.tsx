import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getRecentProgress } from "../../services/planService";
import { toast } from "react-toastify";

interface Activity {
  date: string;
  type: string;
  description: string;
  icon: JSX.Element;
  value?: string;
  calories?: string;
}

const ActivityHistory = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const progress = await getRecentProgress();
        const formattedActivities = progress.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          type: item.workout_done ? "Ejercicio" : item.meals_followed ? "Alimentación" : "Medición",
          description: item.workout_done 
            ? "Entrenamiento completado" 
            : item.meals_followed 
            ? "Plan de comidas seguido" 
            : `Peso: ${item.weight_kg}kg`,
          value: item.weight_kg ? `${item.weight_kg}kg` : undefined,
          calories: item.workout_done ? "300" : item.meals_followed ? "400" : undefined,
          icon: item.workout_done ? (
            <svg width="28" height="28" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9h6v6" />
            </svg>
          ) : item.meals_followed ? (
            <svg width="28" height="28" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="10" rx="2" />
              <path d="M7 7V5a5 5 0 0 1 10 0v2" />
            </svg>
          ) : (
            <svg width="28" height="28" fill="none" stroke="#F39C12" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="8" />
              <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#F39C12">IMC</text>
            </svg>
          ),
        }));
        setActivities(formattedActivities);
      } catch (error) {
        toast.error("Error al cargar el historial de actividades");
        console.error("Error al cargar actividades:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 relative">
        <button
          onClick={() => navigate('/profile')}
          className="absolute left-4 top-4 text-[#2ECC71] hover:text-[#27AE60] transition-colors"
          aria-label="Volver"
        >
          <svg width="28" height="28" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Historial de Actividad</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ECC71]"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay actividades registradas
          </div>
        ) : (
          <div className="space-y-5">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 bg-white p-2 rounded-lg shadow-sm">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[#2C3E50] font-semibold">{activity.type}</span>
                    <span className="text-[#5DADE2] text-xs font-medium">{activity.date}</span>
                  </div>
                  <p className="text-[#2C3E50] mt-1 text-sm">{activity.description}</p>
                  {(activity.value || activity.calories) && (
                    <div className="mt-2 flex gap-4">
                      {activity.value && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                          {activity.value}
                        </span>
                      )}
                      {activity.calories && (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                          {activity.calories} cal
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory; 