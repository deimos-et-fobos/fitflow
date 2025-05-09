import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ClockIcon,
  FireIcon,
  HeartIcon,
  TrophyIcon,
  UserGroupIcon,
} from "../../components/ui/Icons";

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Calorías Quemadas",
      value: "1,250",
      icon: <FireIcon className="w-6 h-6 text-orange-500" />,
      change: "+12%",
      color: "bg-orange-50",
    },
    {
      title: "Minutos Activos",
      value: "45",
      icon: <ClockIcon className="w-6 h-6 text-blue-500" />,
      change: "+8%",
      color: "bg-blue-50",
    },
    {
      title: "Ritmo Cardíaco",
      value: "72",
      icon: <HeartIcon className="w-6 h-6 text-red-500" />,
      change: "-3%",
      color: "bg-red-50",
    },
    {
      title: "Objetivos Completados",
      value: "3/5",
      icon: <TrophyIcon className="w-6 h-6 text-yellow-500" />,
      change: "+2",
      color: "bg-yellow-50",
    },
  ];

  const recentActivities = [
    {
      type: "Entrenamiento",
      name: "Cardio Intenso",
      duration: "30 min",
      calories: "320",
      time: "Hace 2 horas",
    },
    {
      type: "Comida",
      name: "Almuerzo Saludable",
      calories: "450",
      time: "Hace 3 horas",
    },
    {
      type: "Medición",
      name: "Peso Corporal",
      value: "75.5 kg",
      time: "Hace 5 horas",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Hola, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Aquí está tu resumen de hoy
          </p>
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
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs. ayer</span>
              </div>
            </motion.div>
          ))}
        </div>

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
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver todo
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'Entrenamiento' ? 'bg-blue-100' :
                      activity.type === 'Comida' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {activity.type === 'Entrenamiento' ? <ChartBarIcon className="w-5 h-5 text-blue-600" /> :
                       activity.type === 'Comida' ? <FireIcon className="w-5 h-5 text-green-600" /> :
                       <HeartIcon className="w-5 h-5 text-purple-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.name}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.duration && (
                      <p className="text-sm text-gray-600">{activity.duration}</p>
                    )}
                    {activity.calories && (
                      <p className="text-sm text-gray-600">{activity.calories} cal</p>
                    )}
                    {activity.value && (
                      <p className="text-sm text-gray-600">{activity.value}</p>
                    )}
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
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver todo
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <UserGroupIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Nuevos Miembros</p>
                    <p className="text-sm text-gray-600">5 personas se unieron hoy</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrophyIcon className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Logros Desbloqueados</p>
                    <p className="text-sm text-gray-600">3 nuevos logros disponibles</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;