import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    photoUrl: user?.photoUrl || "",
  });
  const [preview, setPreview] = useState(user?.photoUrl || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }
    // Simular actualización global
    setTimeout(() => {
      if (user) {
        setUser({ id: user.id, ...formData });
      }
      setSuccess("¡Perfil actualizado correctamente!");
      setLoading(false);
      setTimeout(() => navigate("/profile"), 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">
        <button
          onClick={() => navigate("/profile")}
          className="absolute left-4 top-4 text-[#2ECC71] hover:text-[#27AE60] transition-colors"
          aria-label="Volver"
        >
          <svg width="28" height="28" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Editar Perfil</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="relative">
              <img
                src={preview || "/assets/user-placeholder.png"}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#2ECC71] bg-[#F9FAFB]"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#2ECC71] text-white rounded-full p-2 shadow hover:bg-[#27AE60] transition-colors"
                aria-label="Cambiar foto"
              >
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15v-3m0 0V9m0 3h3m-3 0H9" /><circle cx="12" cy="12" r="10" /></svg>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <span className="text-xs text-[#2C3E50]">Haz clic en el icono para cambiar la foto</span>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#2C3E50] mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent text-[#2C3E50] bg-[#F9FAFB]"
              placeholder="Tu nombre"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent text-[#2C3E50] bg-[#F9FAFB]"
              placeholder="tu@email.com"
              autoComplete="off"
            />
          </div>
          {error && <div className="text-[#E74C3C] text-sm font-medium text-center">{error}</div>}
          {success && <div className="text-[#2ECC71] text-sm font-medium text-center">{success}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2ECC71] text-white py-3 px-4 rounded-lg hover:bg-[#27AE60] transition-colors font-semibold text-lg shadow disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm; 