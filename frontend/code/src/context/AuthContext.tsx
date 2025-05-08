import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/user.types";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  getCurrentUser,
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
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar token y perfil al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
      getProfile(storedToken)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Guardar token en localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await loginService(email, password); // User | null
      if (!user) return false;
      setUser(user);
      // Obtener el token guardado por el servicio
      const accessToken = localStorage.getItem('access_token');
      setToken(accessToken);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
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
      const userProfile = await getProfile(token);
      setUser(userProfile);
    }
  };

  const updateProfileData = async (data: any) => {
    if (!token) return false;
    try {
      const updatedUser = await updateProfile(token, data);
      setUser(updatedUser);
      return true;
    } catch {
      return false;
    }
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
