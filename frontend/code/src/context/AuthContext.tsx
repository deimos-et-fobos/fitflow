import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user.types";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  getProfile,
  updateProfile,
} from "../services/authService";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  refreshProfile: () => Promise<void>;
  updateProfileData: (data: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const userProfile = await getProfile(storedToken);
          setUser(userProfile);
          const hasInitialData = checkInitialData(userProfile);
          console.log("Datos iniciales completos:", hasInitialData, userProfile);
          if (!hasInitialData && window.location.pathname !== "/initial-data") {
            console.log("Redirigiendo a /initial-data");
            navigate("/initial-data");
          } else if (hasInitialData && window.location.pathname === "/initial-data") {
            console.log("Datos iniciales completos, redirigiendo a /dashboard");
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error al cargar el perfil:", error);
          setUser(null);
          setToken(null);
          logout();
          navigate("/login");
        }
      } else {
        // Solo redirigir a login si no está en una ruta pública
        const publicRoutes = ['/', '/login', '/register'];
        if (!publicRoutes.includes(window.location.pathname)) {
          navigate("/login");
        }
      }
      setIsLoading(false);
    };
    initialize();
  }, [navigate]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await loginService(email, password);
      if (!user) return false;
      setUser(user);
      const accessToken = localStorage.getItem("access_token");
      setToken(accessToken);
      if (accessToken && user) {
        const hasInitialData = checkInitialData(user);
        console.log("Datos iniciales después de login:", hasInitialData, user);
        if (!hasInitialData && window.location.pathname !== "/initial-data") {
          navigate("/initial-data");
        } else {
          navigate("/dashboard");
        }
      }
      return true;
    } catch (error) {
      console.error("Error durante el login:", error);
      return false;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    try {
      const result = await registerService(email, password, name);
      return result.success;
    } catch (error) {
      console.error("Error durante el registro:", error);
      return false;
    }
  };

  const refreshProfile = async () => {
    if (token) {
      try {
        const userProfile = await getProfile(token);
        setUser(userProfile);
        const hasInitialData = checkInitialData(userProfile);
        if (!hasInitialData && window.location.pathname !== "/initial-data") {
          navigate("/initial-data");
        }
      } catch (error) {
        console.error("Error al refrescar el perfil:", error);
        navigate("/login");
      }
    }
  };

  const updateProfileData = async (data: any) => {
    if (!token) return false;
    try {
      // Mapear valores antes de enviarlos al backend
      const mappedData = {
        ...data,
        sex: data.sex === "male" ? "M" : data.sex === "female" ? "F" : data.sex,
        dietary_restrictions: data.dietary_restrictions || [],
      };
      const updatedUser = await updateProfile(token, mappedData);
      setUser(updatedUser);
      return true;
    } catch (error: any) {
      console.error("Error al actualizar el perfil:", error.message || error);
      throw error; // Lanzar el error para que InitialDataPage lo maneje
    }
  };

  const checkInitialData = (user: User | null): boolean => {
    if (!user) {
      console.log("Usuario no encontrado en checkInitialData");
      return false;
    }
    console.log("Datos del usuario:", user); // Imprimir todos los datos del usuario
    const hasData = !!(
      user.age &&
      user.height_cm &&
      user.weight_kg &&
      user.sex &&
      user.activity_level
    );
    console.log("Campos verificados:", {
      age: user.age,
      height_cm: user.height_cm,
      weight_kg: user.weight_kg,
      sex: user.sex,
      activity_level: user.activity_level,
    });
    return hasData;
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    register,
    setUser,
    setToken,
    refreshProfile,
    updateProfileData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};