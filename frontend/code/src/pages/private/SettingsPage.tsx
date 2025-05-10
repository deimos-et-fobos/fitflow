import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const SettingsPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [notif, setNotif] = useState(true);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de cambio de contraseña
    setTimeout(() => {
      if (passwords.new !== passwords.confirm) {
        toast.error("Las contraseñas no coinciden");
      } else if (!passwords.current || !passwords.new) {
        toast.error("Completa todos los campos");
      } else {
        toast.success("Contraseña cambiada correctamente");
        setPasswords({ current: "", new: "", confirm: "" });
      }
      setLoading(false);
    }, 1200);
  };

  const handleDeleteAccount = () => {
    setLoading(true);
    // Simulación de borrado
    setTimeout(() => {
      toast.success("Cuenta eliminada (simulado)");
      logout();
      navigate("/register");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 relative">
        <button
          onClick={() => navigate('/profile')}
          className="absolute left-4 top-4 text-[#2ECC71] hover:text-[#27AE60] transition-colors"
          aria-label="Volver"
        >
          <svg width="28" height="28" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Configuración</h1>

        {/* Cambiar contraseña */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">Cambiar Contraseña</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-200 rounded-lg bg-[#F9FAFB]"
              placeholder="Contraseña actual"
              autoComplete="current-password"
            />
            <input
              type="password"
              name="new"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-200 rounded-lg bg-[#F9FAFB]"
              placeholder="Nueva contraseña"
              autoComplete="new-password"
            />
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-200 rounded-lg bg-[#F9FAFB]"
              placeholder="Confirmar nueva contraseña"
              autoComplete="new-password"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2ECC71] text-white py-3 px-4 rounded-lg hover:bg-[#27AE60] transition-colors font-semibold text-lg shadow disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Cambiar Contraseña"}
            </button>
          </form>
        </div>

        {/* Preferencias */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">Preferencias</h2>
          <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-lg border border-gray-200">
            <span className="text-[#2C3E50]">Notificaciones por email</span>
            <button
              onClick={() => setNotif((n) => !n)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${notif ? 'bg-[#2ECC71]' : 'bg-gray-300'}`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${notif ? 'translate-x-6' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Eliminar cuenta */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#E74C3C] mb-4">Eliminar Cuenta</h2>
          <button
            onClick={() => setShowDelete(true)}
            className="w-full bg-[#E74C3C] text-white py-3 px-4 rounded-lg hover:bg-[#C0392B] transition-colors font-semibold text-lg shadow"
          >
            Eliminar mi cuenta
          </button>
          {showDelete && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-bold text-[#E74C3C] mb-4">¿Estás seguro?</h3>
                <p className="mb-6 text-[#2C3E50]">Esta acción no se puede deshacer. ¿Deseas eliminar tu cuenta?</p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-[#E74C3C] text-white py-2 rounded-lg hover:bg-[#C0392B] font-semibold"
                    disabled={loading}
                  >
                    Sí, eliminar
                  </button>
                  <button
                    onClick={() => setShowDelete(false)}
                    className="flex-1 bg-gray-200 text-[#2C3E50] py-2 rounded-lg hover:bg-gray-300 font-semibold"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="w-full bg-gray-200 text-[#2C3E50] py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-lg shadow"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default SettingsPage; 