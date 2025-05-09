import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";
import { ChevronDownIcon } from "../ui/Icons";
import BottomNavBar from "./BottomNavBar";

const MainLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogOut = () => {
    setUserMenuOpen(false);
    logout();
  };

  const closeMenus = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between w-full h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img className="w-10 h-10 object-contain" src="/logo.png" alt="FitFlow Logo" />
              <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
                FitFlow
              </Link>
            </div>
            {/* Botón hamburguesa para mobile */}
            <button
              className="sm:hidden flex items-center px-3 py-2 border rounded text-blue-600 border-blue-300 hover:bg-blue-50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Menú de navegación desktop */}
            <ul className="text-lg font-medium items-center space-x-10 hidden sm:flex">
              <li>
                <Link
                  to="/"
                  className={`$${location.pathname === "/" ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"} pb-1 transition-all`}
                  onClick={closeMenus}
                >
                  Inicio
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className={`$${location.pathname === "/dashboard" ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"} pb-1 transition-all`}
                      onClick={closeMenus}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="bg-blue-500 rounded-full text-white w-10 h-10 font-bold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                      title="Cuenta"
                    >
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                        <ul className="py-2 text-gray-700">
                          <li>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 hover:bg-blue-50"
                              onClick={closeMenus}
                            >
                              Perfil
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogOut}
                              className="w-full text-left px-4 py-2 hover:bg-blue-50"
                            >
                              Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className={`$${location.pathname === "/login" ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"} pb-1 transition-all`}
                      onClick={closeMenus}
                    >
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className={`$${location.pathname === "/register" ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"} pb-1 transition-all`}
                      onClick={closeMenus}
                    >
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Menú mobile desplegable */}
          {mobileMenuOpen && (
            <div className="sm:hidden bg-white rounded-b-xl shadow-lg border-t border-blue-100 mt-2 py-4 px-4 absolute left-0 right-0 w-full z-40">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/"
                    className={`$${location.pathname === "/" ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"}`}
                    onClick={closeMenus}
                  >
                    Inicio
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className={`$${location.pathname === "/dashboard" ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"}`}
                        onClick={closeMenus}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className={`$${location.pathname === "/profile" ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"}`}
                        onClick={closeMenus}
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="w-full text-left px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className={`$${location.pathname === "/login" ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"}`}
                        onClick={closeMenus}
                      >
                        Iniciar Sesión
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className={`$${location.pathname === "/register" ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"}`}
                        onClick={closeMenus}
                      >
                        Registrarse
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {isAuthenticated && <BottomNavBar />}

      <footer className="bg-white border-t border-gray-200">
        <article className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-gray-500">
              &copy; 2025 FitFlow. Todos los derechos reservados.
            </p>
          </div>
        </article>
      </footer>
    </div>
  );
};

export default MainLayout;
