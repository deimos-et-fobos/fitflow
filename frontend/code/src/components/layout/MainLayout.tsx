import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";
import { ChevronDownIcon } from "../ui/Icons";

const MainLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogOut = () => {
    setUserMenuOpen(false);
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-100/70 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex justify-between w-full">
              <div className="flex-shrink-0 flex items-center gap-2">
                <img className="w-8 h-8 object-cover" src={Logo} alt="" />
                <Link to="/" className="text-xl font-bold text-blue-600">
                  FitFlow
                </Link>
              </div>
              <ul className="text-lg font-medium hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                <li>
                  <Link
                    to="/"
                    onClick={() => setUserMenuOpen(false)}
                    className={`${
                      location.pathname === "/"
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    } inline-flex items-center`}
                  >
                    Inicio
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className={`${
                          location.pathname === "/dashboard"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                        } inline-flex items-center`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li
                      onClick={toggleUserMenu}
                      className="relative cursor-pointer hover:[&>button]:bg-blue-500"
                      title="Cuenta"
                    >
                      <button
                        className={`bg-blue-400 rounded-full text-white w-10 h-10 font-medium cursor-pointer transition-colors duration-300`}
                      >
                        U
                      </button>
                      <span className="absolute -bottom-1 -right-1 flex items-center justify-center text-white bg-gray-700 rounded-full w-5 h-5 p-[2px]">
                        <ChevronDownIcon />
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className={`${
                          location.pathname === "/login"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                        } inline-flex items-center`}
                      >
                        Iniciar Sesión
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className={`${
                          location.pathname === "/register"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                        } inline-flex items-center`}
                      >
                        Registrarse
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Menú usuario */}
        <article
          className={`${
            userMenuOpen ? "block" : "hidden"
          } absolute right-2 text-gray-700 bg-sky-200 rounded-lg p-3 px-6 z-10`}
        >
          <ul className="space-y-2 font-semibold">
            <li>{user?.name}</li>
            <li>
              <Link
                onClick={() => setUserMenuOpen(false)}
                className="hover:text-gray-900"
                to="/profile"
              >
                Perfil
              </Link>
            </li>
            <li>
              <button
                className="hover:text-gray-900 cursor-pointer"
                onClick={handleLogOut}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </article>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

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
