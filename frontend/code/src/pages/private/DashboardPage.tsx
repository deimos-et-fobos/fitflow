import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Bienvenido, {user?.name}
          </h2>
          <p className="text-gray-600">
            Este es un dashboard de ejemplo que simula una área privada para
            usuarios autenticados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta de estadísticas */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-700">Visitas</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
          </div>

          {/* Tarjeta de actividad */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-700">Actividad</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">87%</p>
          </div>

          {/* Tarjeta de completado */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-700">Completado</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">65%</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Tareas Pendientes
          </h3>
          <ul className="space-y-3">
            {[
              "Completar perfil",
              "Revisar notificaciones",
              "Actualizar configuración",
            ].map((task, index) => (
              <li
                key={index}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <input type="checkbox" className="mr-3" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
