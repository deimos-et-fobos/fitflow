import React from "react";

interface CardButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-[#E8F8F5] transition-colors mb-3"
    >
      <span className="text-emerald-600 text-2xl">{icon}</span>
      <span className="text-base font-medium text-gray-800">{label}</span>
    </button>
  );
};

export default CardButton; 