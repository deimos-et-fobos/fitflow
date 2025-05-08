import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/ui/Avatar";
import BottomNavBar from "../../components/layout/BottomNavBar";

// Iconos SVG para los accesos rápidos
const GearIcon = (
  <svg width="24" height="24" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ActivityIcon = (
  <svg width="24" height="24" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const HeartIcon = (
  <svg width="24" height="24" fill="none" stroke="#F39C12" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const ArrowRight = (
  <svg width="24" height="24" fill="none" stroke="#2C3E50" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#F9FAFB] pb-24 flex flex-col items-center">
      {/* Avatar y nombre */}
      {user && (
        <section className="flex flex-col items-center mt-10 mb-8 w-full">
          <Avatar src={user.photoUrl} size={96} />
          <h2 className="mt-4 text-2xl font-bold text-[#2C3E50]">{user.name}</h2>
        </section>
      )}

      {/* Opciones */}
      <section className="flex flex-col gap-4 px-4 w-full max-w-md">
        <button
          onClick={() => navigate("/profile/edit")}
          className="flex items-center justify-between w-full bg-white rounded-2xl shadow p-4 hover:bg-[#E8F8F5] transition-colors border border-gray-100"
        >
          <div className="flex items-center gap-4">
            {GearIcon}
            <span className="text-lg font-medium text-[#2C3E50]">Configuración</span>
          </div>
          {ArrowRight}
        </button>
        <button
          onClick={() => navigate("/profile/activity")}
          className="flex items-center justify-between w-full bg-white rounded-2xl shadow p-4 hover:bg-[#E8F8F5] transition-colors border border-gray-100"
        >
          <div className="flex items-center gap-4">
            {ActivityIcon}
            <span className="text-lg font-medium text-[#2C3E50]">Historial de actividad</span>
          </div>
          {ArrowRight}
        </button>
        <button
          onClick={() => navigate("/profile/health")}
          className="flex items-center justify-between w-full bg-white rounded-2xl shadow p-4 hover:bg-[#E8F8F5] transition-colors border border-gray-100"
        >
          <div className="flex items-center gap-4">
            {HeartIcon}
            <span className="text-lg font-medium text-[#2C3E50]">Datos de salud</span>
          </div>
          {ArrowRight}
        </button>
      </section>

      {/* Solo una barra de navegación */}
      <div className="w-full fixed bottom-0 left-0 right-0 z-50">
        <BottomNavBar />
      </div>
    </main>
  );
};

export default ProfilePage;
