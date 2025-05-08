import React from "react";

const navItems = [
  { label: "Perfil", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20c0-2.2 3.6-4 6-4s6 1.8 6 4" />
      </svg>
    ) },
  { label: "Paying", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="10" rx="2" />
        <path d="M7 7V5a5 5 0 0 1 10 0v2" />
      </svg>
    ) },
  { label: "Cobranda", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ) },
];

const BottomNavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
      {navItems.map((item) => (
        <button
          key={item.label}
          className="flex flex-col items-center text-emerald-700 hover:text-emerald-500 focus:outline-none"
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavBar; 