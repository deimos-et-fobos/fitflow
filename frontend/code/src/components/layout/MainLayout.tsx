import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";

const MainLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navegación */}
      <nav className="bg-blue-100/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center gap-2">
                <img className="w-8 h-8 object-cover" src={Logo} alt="" />
                <Link to="/" className="text-xl font-bold text-blue-600">
                  FitFlow
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Inicio
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className={`${
                        location.pathname === "/dashboard"
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className={`${
                        location.pathname === "/profile"
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Perfil
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`${
                        location.pathname === "/login"
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/register"
                      className={`${
                        location.pathname === "/register"
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {isAuthenticated && (
                <div className="ml-3 relative">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                    <button
                      onClick={logout}
                      className="bg-blue-500 text-sm font-medium text-white py-2 px-4 hover:bg-blue-700 rounded-2xl cursor-pointer"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              {/* Botón de menú móvil */}
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Abrir menú</span>
                {/* Icono de menú */}
                <svg
                  className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icono de cerrar */}
                <svg
                  className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Inicio
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`${
                    location.pathname === "/dashboard"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`${
                    location.pathname === "/profile"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Perfil
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${
                    location.pathname === "/login"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className={`${
                    location.pathname === "/register"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-gray-500">
              &copy; 2025 FitFlow. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
