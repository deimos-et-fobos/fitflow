import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Inicio",
    to: "/dashboard",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7m-9 8v-6h4v6m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "Perfil",
    to: "/profile",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20c0-2.2 3.6-4 6-4s6 1.8 6 4" />
      </svg>
    ),
  },
  {
    label: "Comunidad",
    to: "/comunidad",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Más",
    to: "/mas",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    ),
  },
];

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`flex flex-col items-center transition-colors py-1 px-2 ${
              isActive ? "text-blue-600 font-bold" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar; 