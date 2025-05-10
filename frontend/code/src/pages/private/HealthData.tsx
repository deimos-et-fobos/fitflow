import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getRecentProgress } from "../../services/planService";
import { getProfile } from "../../services/authService";
import { toast } from "react-toastify";
import { User } from "../../types/user.types";

interface HealthMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: string;
}

const HealthData = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      setIsLoading(true);
      try {
        // Obtener datos del usuario
        const token = localStorage.getItem('access_token') || '';
        const userData = await getProfile(token);
        setUser(userData);

        // Obtener progreso reciente
        const progress = await getRecentProgress();
        const latestProgress = progress[0] || {};

        // Determinar valores a mostrar
        const weight = latestProgress.weight_kg ?? userData.weight_kg ?? 0;
        const height = userData.height_cm ?? 0;
        const age = userData.age ?? "-";
        const sex = userData.sex ?? "-";
        const calories = latestProgress.calories_burned ?? null;
        const minutes = latestProgress.minutes_active ?? null;

        // Calcular IMC
        let bmi = latestProgress.bmi;
        let bmiStatus = latestProgress.bmi_status;
        if (!bmi && weight && height) {
          const h = height / 100;
          bmi = weight / (h * h);
          if (bmi < 18.5) bmiStatus = "Bajo peso";
          else if (bmi < 25) bmiStatus = "Normal";
          else if (bmi < 30) bmiStatus = "Sobrepeso";
          else bmiStatus = "Obesidad";
        }

        const healthMetrics: HealthMetric[] = [
          {
            label: "Peso Actual",
            value: weight ? `${weight} kg` : "No registrado",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v20M2 12h20" />
              </svg>
            ),
            color: "#5DADE2",
            bgColor: "bg-blue-100"
          },
          {
            label: "Altura",
            value: height ? `${height} cm` : "No registrado",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#8E44AD" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="6" y="2" width="12" height="20" rx="2" />
              </svg>
            ),
            color: "#8E44AD",
            bgColor: "bg-purple-100"
          },
          {
            label: "Edad",
            value: age ? `${age}` : "No registrado",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#F39C12" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            ),
            color: "#F39C12",
            bgColor: "bg-orange-100"
          },
          {
            label: "Sexo",
            value: sex === "M" ? "Masculino" : sex === "F" ? "Femenino" : sex,
            icon: (
              <svg width="24" height="24" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
            ),
            color: "#2ECC71",
            bgColor: "bg-green-100"
          },
          {
            label: "IMC",
            value: bmi ? bmi.toFixed(1) : "No registrado",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v20M2 12h20" />
              </svg>
            ),
            color: "#2ECC71",
            bgColor: "bg-green-100",
            trend: bmiStatus || "-"
          },
          {
            label: "Calorías Quemadas",
            value: calories ? `${calories} cal` : "No registrado",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#F39C12" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v20M2 12h20" />
              </svg>
            ),
            color: "#F39C12",
            bgColor: "bg-orange-100"
          },
          {
            label: "Minutos Activos",
            value: minutes ? `${minutes} min` : "No registrado",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#E74C3C" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v20M2 12h20" />
              </svg>
            ),
            color: "#E74C3C",
            bgColor: "bg-red-100"
          }
        ];

        setMetrics(healthMetrics);
      } catch (error) {
        toast.error("Error al cargar los datos de salud");
        console.error("Error al cargar datos de salud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthData();
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
        <h1 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Datos de Salud</h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate('/profile/edit')}
            className="text-sm text-[#2ECC71] hover:underline hover:text-[#27AE60] font-medium"
          >
            ¿Datos incorrectos? Edita tu perfil
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ECC71]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${metric.bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {metric.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-[#2C3E50]">{metric.label}</h3>
                  </div>
                  {metric.trend && (
                    <span className="text-sm px-3 py-1 rounded-full bg-white text-[#2ECC71] font-medium">
                      {metric.trend}
                    </span>
                  )}
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </p>
                  <div className="text-sm text-gray-500">
                    Última actualización: Hoy
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Gráfico de Progreso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Progreso de Peso</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico de progreso (próximamente)</p>
          </div>
        </motion.div>

        {/* Consejos de Salud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Consejos de Salud</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg width="12" height="12" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Mantén una dieta balanceada y variada</p>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg width="12" height="12" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Realiza al menos 30 minutos de ejercicio diario</p>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg width="12" height="12" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Mantén una buena hidratación</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthData; 