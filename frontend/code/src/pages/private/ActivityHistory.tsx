import React from "react";
import { useNavigate } from "react-router-dom";

const activities = [
  { date: "2024-03-20", type: "Ejercicio", description: "Rutina de cardio", icon: (
    <svg width="28" height="28" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9h6v6" /></svg>
  ) },
  { date: "2024-03-19", type: "Alimentación", description: "Plan de comidas", icon: (
    <svg width="28" height="28" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M7 7V5a5 5 0 0 1 10 0v2" /></svg>
  ) },
  { date: "2024-03-18", type: "Medición", description: "Peso: 70kg", icon: (
    <svg width="28" height="28" fill="none" stroke="#F39C12" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#F39C12">IMC</text></svg>
  ) },
];

const ActivityHistory = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">
        <button
          onClick={() => navigate('/profile')}
          className="absolute left-4 top-4 text-[#2ECC71] hover:text-[#27AE60] transition-colors"
          aria-label="Volver"
        >
          <svg width="28" height="28" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Historial de Actividad</h1>
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-[#F9FAFB] border border-gray-100 rounded-xl shadow-sm p-4 hover:bg-[#E8F8F5] transition-colors"
            >
              <div className="flex-shrink-0">{activity.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[#2C3E50] font-semibold">{activity.type}</span>
                  <span className="text-[#5DADE2] text-xs font-medium">{activity.date}</span>
                </div>
                <p className="text-[#2C3E50] mt-1 text-sm">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityHistory; 