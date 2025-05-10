import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaBirthdayCake, FaRulerVertical, FaWeight, FaVenusMars, FaRunning, FaLeaf, FaBullseye } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const InitialDataPage = () => {
  const [formData, setFormData] = useState({
    age: "",
    height_cm: "",
    weight_kg: "",
    sex: "",
    activity_level: "",
    dietary_restrictions: [] as string[],
    goal: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, updateProfileData } = useAuth();
  const navigate = useNavigate();

  // Tooltip helper
  const [tooltip, setTooltip] = useState<string | null>(null);
  const showTooltip = (msg: string) => setTooltip(msg);
  const hideTooltip = () => setTooltip(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "dietary_restrictions") {
      const options = (e.target as HTMLSelectElement).selectedOptions;
      const selectedValues = Array.from(options, option => option.value);
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!formData.age || !formData.height_cm || !formData.weight_kg || !formData.sex || !formData.activity_level || !formData.goal) {
      setError("Por favor completa todos los campos obligatorios.");
      setIsLoading(false);
      return;
    }

    try {
      const success = await updateProfileData({
        age: parseInt(formData.age),
        height_cm: parseFloat(formData.height_cm),
        weight_kg: parseFloat(formData.weight_kg),
        sex: formData.sex, // Ya mapeado a 'M' o 'F' en el formulario
        activity_level: formData.activity_level,
        dietary_restrictions: formData.dietary_restrictions,
        goal: formData.goal,
      });
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Error al guardar los datos.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? `Error al guardar los datos: ${err.message}`
          : "Ocurrió un error al guardar los datos."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Redirigir al login si no hay usuario
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-100 via-purple-100 to-white">
      {/* Lado izquierdo con imagen motivacional */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=900&q=80"
          alt="Motivación Fitness"
          className="w-full h-full object-cover scale-105 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        <div className="absolute z-10 left-0 top-0 w-full h-full flex flex-col items-center justify-center px-12">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6 text-center">¡Transforma tu vida!</h1>
          <p className="text-xl text-gray-200 mb-8 text-center max-w-md">Registra tus datos y comienza tu viaje hacia una vida más saludable y activa con FitFlow.</p>
          <ul className="space-y-4 w-full max-w-xs">
            <li className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white shadow-lg">
              <FaBullseye className="text-3xl text-yellow-300" />
              <span>Metas personalizadas</span>
            </li>
            <li className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white shadow-lg">
              <FaRunning className="text-3xl text-green-300" />
              <span>Seguimiento inteligente</span>
            </li>
            <li className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white shadow-lg">
              <FaLeaf className="text-3xl text-lime-300" />
              <span>Recomendaciones saludables</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-h-screen justify-center items-center">
        {/* Header minimalista */}
        <header className="w-full flex items-center justify-center py-6">
          <img src="/logo.png" alt="FitFlow" className="h-12 mr-3" />
          <span className="text-3xl font-extrabold text-blue-600 tracking-tight">FitFlow</span>
        </header>
        {/* Tarjeta central animada */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full max-w-lg bg-white/80 rounded-3xl shadow-2xl p-10 mt-2 mb-8 backdrop-blur-md border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Datos iniciales</h2>
          <p className="text-center text-gray-600 mb-8 text-lg">Personaliza tu experiencia en FitFlow</p>
          <form className="space-y-7" onSubmit={handleSubmit}>
            {/* Edad y Género */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="age" className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <FaBirthdayCake className="text-xl text-blue-400" /> Edad
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 px-4 text-gray-900 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-sm"
                  placeholder="Ej: 25"
                  min={1}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="sex" className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <FaVenusMars className="text-xl text-pink-400" /> Género
                </label>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 px-4 text-gray-900 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-sm"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
            </div>
            {/* Altura y Peso */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="height_cm" className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <FaRulerVertical className="text-xl text-purple-400" /> Altura (cm)
                </label>
                <input
                  id="height_cm"
                  name="height_cm"
                  type="number"
                  required
                  value={formData.height_cm}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 px-4 text-gray-900 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-sm"
                  placeholder="Ej: 170"
                  min={1}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="weight_kg" className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <FaWeight className="text-xl text-green-400" /> Peso (kg)
                </label>
                <input
                  id="weight_kg"
                  name="weight_kg"
                  type="number"
                  required
                  value={formData.weight_kg}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 px-4 text-gray-900 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 shadow-sm"
                  placeholder="Ej: 65"
                  min={1}
                />
              </div>
            </div>
            {/* Nivel de actividad física */}
            <div>
              <label htmlFor="activity_level" className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <FaRunning className="text-xl text-orange-400" /> Nivel de actividad física
              </label>
              <select
                id="activity_level"
                name="activity_level"
                value={formData.activity_level}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 py-3 px-4 text-gray-900 bg-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm"
              >
                <option value="">Selecciona una opción</option>
                <option value="sedentary">Sedentario</option>
                <option value="light">Ligero</option>
                <option value="moderate">Moderado</option>
                <option value="active">Activo</option>
                <option value="very_active">Muy activo</option>
              </select>
            </div>
            {/* Restricciones dietéticas y Objetivo */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="dietary_restrictions" className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <FaLeaf className="text-xl text-lime-500" /> Restricciones dietéticas
                </label>
                <select
                  id="dietary_restrictions"
                  name="dietary_restrictions"
                  multiple
                  value={formData.dietary_restrictions}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 px-4 text-gray-900 bg-white/70 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-300 shadow-sm"
                >
                  <option value="vegan">Vegana</option>
                  <option value="vegetarian">Vegetariana</option>
                  <option value="gluten_free">Sin gluten</option>
                  <option value="lactose_free">Sin lactosa</option>
                  <option value="low_carb">Baja en carbohidratos</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                  <option value="halal">Halal</option>
                  <option value="kosher">Kosher</option>
                  <option value="nut_free">Sin frutos secos</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="goal" className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <FaBullseye className="text-xl text-yellow-400" /> Objetivo
                </label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 px-4 text-gray-900 bg-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 shadow-sm"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="lose_weight">Perder peso</option>
                  <option value="gain_muscle">Ganar músculo</option>
                  <option value="maintain_weight">Mantener peso</option>
                  <option value="improve_endurance">Mejorar resistencia</option>
                  <option value="increase_flexibility">Aumentar flexibilidad</option>
                  <option value="boost_energy">Aumentar energía</option>
                  <option value="reduce_stress">Reducir estrés</option>
                </select>
              </div>
            </div>
            {/* Error */}
            {error && <div className="text-red-500 text-center text-sm bg-red-50 border border-red-200 rounded-xl py-2 px-4">{error}</div>}
            {/* Botón */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Guardando...
                  </span>
                ) : (
                  "Guardar datos"
                )}
              </button>
            </div>
          </form>
        </motion.div>
        {/* Footer de advertencia */}
        <div className="mb-4 px-6 text-xs text-center text-yellow-600">
          <span className="font-semibold">Recuerda:</span> Los datos que ingreses serán usados para personalizar tu experiencia. Consulta siempre a un profesional de la salud ante cualquier duda.
        </div>
      </div>
    </div>
  );
};

export default InitialDataPage;