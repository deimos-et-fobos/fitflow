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
    <div className="min-h-screen bg-[#eaf4fb] flex flex-col">
      {/* Header fijo */}
      <header className="w-full bg-[#eaf4fb] border-b border-blue-200 py-3 flex items-center px-4 fixed top-0 left-0 z-10">
        <img src="/logo.png" alt="FitFlow" className="h-8 mr-2" />
        <span className="text-xl font-bold text-blue-600">FitFlow</span>
      </header>
      {/* Espaciado para el header */}
      <div className="h-14" />
      {/* Tarjeta central animada */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="mx-auto w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 mt-6 relative"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Ingresa tus datos iniciales
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Personaliza tu experiencia en FitFlow
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Edad */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="relative">
            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900 flex items-center gap-1">
              <FaBirthdayCake className="text-blue-400" /> Edad
              <MdInfoOutline className="ml-1 text-gray-400 cursor-pointer" onMouseEnter={() => showTooltip('Tu edad nos ayuda a personalizar tus recomendaciones.')} onMouseLeave={hideTooltip} />
            </label>
            {tooltip && <span className="absolute left-32 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 z-20 animate-fade-in">{tooltip}</span>}
            <input
              id="age"
              name="age"
              type="number"
              required
              value={formData.age}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-10 py-2 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-gray-400 mt-1 focus:shadow-lg outline-none"
              placeholder="Ej: 25"
              min={1}
            />
            <FaBirthdayCake className="absolute left-3 top-9 text-gray-300 pointer-events-none" />
          </motion.div>
          {/* Separador */}
          <div className="border-t border-blue-100 my-1" />
          {/* Altura */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="relative">
            <label htmlFor="height_cm" className="block text-sm font-medium leading-6 text-gray-900 flex items-center gap-1">
              <FaRulerVertical className="text-blue-400" /> Altura (cm)
              <MdInfoOutline className="ml-1 text-gray-400 cursor-pointer" onMouseEnter={() => showTooltip('La altura es clave para calcular tu IMC y planes personalizados.')} onMouseLeave={hideTooltip} />
            </label>
            {tooltip && <span className="absolute left-36 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 z-20 animate-fade-in">{tooltip}</span>}
            <input
              id="height_cm"
              name="height_cm"
              type="number"
              required
              value={formData.height_cm}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-10 py-2 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-gray-400 mt-1 focus:shadow-lg outline-none"
              placeholder="Ej: 170"
              min={1}
            />
            <FaRulerVertical className="absolute left-3 top-9 text-gray-300 pointer-events-none" />
          </motion.div>
          <div className="border-t border-blue-100 my-1" />
          {/* Peso */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative">
            <label htmlFor="weight_kg" className="block text-sm font-medium leading-6 text-gray-900 flex items-center gap-1">
              <FaWeight className="text-blue-400" /> Peso (kg)
              <MdInfoOutline className="ml-1 text-gray-400 cursor-pointer" onMouseEnter={() => showTooltip('El peso es necesario para calcular tu progreso y recomendaciones.')} onMouseLeave={hideTooltip} />
            </label>
            {tooltip && <span className="absolute left-36 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 z-20 animate-fade-in">{tooltip}</span>}
            <input
              id="weight_kg"
              name="weight_kg"
              type="number"
              required
              value={formData.weight_kg}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-10 py-2 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-gray-400 mt-1 focus:shadow-lg outline-none"
              placeholder="Ej: 65"
              min={1}
            />
            <FaWeight className="absolute left-3 top-9 text-gray-300 pointer-events-none" />
          </motion.div>
          <div className="border-t border-blue-100 my-1" />
          {/* Género */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="relative">
            <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900 flex items-center gap-1">
              <FaVenusMars className="text-blue-400" /> Género
              <MdInfoOutline className="ml-1 text-gray-400 cursor-pointer" onMouseEnter={() => showTooltip('El género ayuda a personalizar tus planes y métricas.')} onMouseLeave={hideTooltip} />
            </label>
            {tooltip && <span className="absolute left-32 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 z-20 animate-fade-in">{tooltip}</span>}
            <div className="relative">
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-300 px-10 py-2 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all mt-1 focus:shadow-lg appearance-none outline-none bg-white"
              >
                <option value="">Selecciona una opción</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
              <FaVenusMars className="absolute left-3 top-3.5 text-gray-300 pointer-events-none" />
              <span className="absolute right-3 top-4 text-gray-400 pointer-events-none">▼</span>
            </div>
          </motion.div>
          <div className="border-t border-blue-100 my-1" />
          {/* Nivel de actividad física */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
            <label htmlFor="activity_level" className="block text-sm font-medium leading-6 text-gray-900 flex items-center gap-1">
              <FaRunning className="text-blue-400" /> Nivel de actividad física
              <MdInfoOutline className="ml-1 text-gray-400 cursor-pointer" onMouseEnter={() => showTooltip('Selecciona tu nivel de actividad para mejores recomendaciones.')} onMouseLeave={hideTooltip} />
            </label>
            {tooltip && <span className="absolute left-56 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 z-20 animate-fade-in">{tooltip}</span>}
            <div className="relative">
              <select
                id="activity_level"
                name="activity_level"
                value={formData.activity_level}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-300 px-10 py-2 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all mt-1 focus:shadow-lg appearance-none outline-none bg-white"
              >
                <option value="">Selecciona una opción</option>
                <option value="sedentary">Sedentario</option>
                <option value="light">Ligero</option>
                <option value="moderate">Moderado</option>
                <option value="active">Activo</option>
                <option value="very_active">Muy activo</option>
              </select>
              <FaRunning className="absolute left-3 top-3.5 text-gray-300 pointer-events-none" />
              <span className="absolute right-3 top-4 text-gray-400 pointer-events-none">▼</span>
            </div>
          </motion.div>
          <div className="border-t border-blue-100 my-1" />
          {/* Restricciones dietéticas */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="relative">
            <label htmlFor="dietary_restrictions" className="block text-sm font-medium leading-6 text-gray-900 flex items-center gap-1">
              <FaLeaf className="text-blue-400" /> Restricciones dietéticas
              <MdInfoOutline className="ml-1 text-gray-400 cursor-pointer" onMouseEnter={() => showTooltip('Selecciona si tienes alguna restricción alimentaria.')} onMouseLeave={hideTooltip} />
            </label>
            {tooltip && <span className="absolute left-56 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 z-20 animate-fade-in">{tooltip}</span>}
            <div className="relative">
              <select
                id="dietary_restrictions"
                name="dietary_restrictions"
                multiple
                value={formData.dietary_restrictions}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-300 px-10 py-2 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all mt-1 focus:shadow-lg appearance-none outline-none bg-white"
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
              <FaLeaf className="absolute left-3 top-3.5 text-gray-300 pointer-events-none" />
              <span className="absolute right-3 top-4 text-gray-400 pointer-events-none">▼</span>
            </div>
          </motion.div>
          <div className="border-t border-blue-100 my-1" />
          {/* Objetivo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative">
            <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900 flex items-center gap-1">
              <FaBullseye className="text-blue-400" /> Objetivo
              <MdInfoOutline className="ml-1 text-gray-400 cursor-pointer" onMouseEnter={() => showTooltip('Define tu objetivo principal para personalizar tu plan.')} onMouseLeave={hideTooltip} />
            </label>
            {tooltip && <span className="absolute left-32 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 z-20 animate-fade-in">{tooltip}</span>}
            <div className="relative">
              <select
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-300 px-10 py-2 shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all mt-1 focus:shadow-lg appearance-none outline-none bg-white"
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
              <FaBullseye className="absolute left-3 top-3.5 text-gray-300 pointer-events-none" />
              <span className="absolute right-3 top-4 text-gray-400 pointer-events-none">▼</span>
            </div>
          </motion.div>
          {/* Error */}
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">{error}</motion.p>}
          {/* Botón */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-base font-semibold leading-6 text-white shadow-xl hover:bg-blue-700 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-2 relative"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
              ) : null}
              {isLoading ? "Guardando..." : "Guardar datos"}
            </button>
          </motion.div>
        </form>
      </motion.div>
      {/* Footer de advertencia */}
      <div className="mt-6 mb-2 px-6 text-xs text-center text-yellow-600">
        <span className="font-semibold">Recuerda:</span> Los datos que ingreses serán usados para personalizar tu experiencia. Consulta siempre a un profesional de la salud ante cualquier duda.
      </div>
    </div>
  );
};

export default InitialDataPage;