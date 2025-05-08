import React from "react";
import { useNavigate } from "react-router-dom";

const healthMetrics = [
  {
    label: "Peso",
    value: "70 kg",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#2ECC71" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" /><text x="12" y="18" textAnchor="middle" fontSize="10" fill="#2ECC71">kg</text></svg>
    ),
  },
  {
    label: "Altura",
    value: "175 cm",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#5DADE2" strokeWidth="2" viewBox="0 0 24 24"><rect x="10" y="4" width="4" height="16" rx="2" /><text x="12" y="26" textAnchor="middle" fontSize="10" fill="#5DADE2">cm</text></svg>
    ),
  },
  {
    label: "IMC",
    value: "22.9",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#F39C12" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#F39C12">IMC</text></svg>
    ),
  },
  {
    label: "Última Actualización",
    value: "2024-03-20",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#2C3E50" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
    ),
  },
];

const HealthData = () => {
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
        <h1 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Datos de Salud</h1>
        <div className="grid grid-cols-1 gap-5">
          {healthMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-[#F9FAFB] border border-gray-100 rounded-xl shadow-sm p-4 hover:bg-[#E8F8F5] transition-colors"
            >
              <div className="flex-shrink-0">{metric.icon}</div>
              <div className="flex-1">
                <span className="text-[#2C3E50] font-semibold">{metric.label}</span>
                <div className="text-lg font-bold mt-1" style={{ color: idx === 2 ? '#F39C12' : idx === 0 ? '#2ECC71' : idx === 1 ? '#5DADE2' : '#2C3E50' }}>{metric.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthData; 