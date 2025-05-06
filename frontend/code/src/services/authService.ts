import { User } from "../types/user.types";

// Usuario mockeado para simular la autenticación
const MOCK_USER: User = {
  id: "1",
  name: "Usuario Ejemplo",
  email: "usuario@ejemplo.com",
};

// Credenciales válidas para simular login
const VALID_CREDENTIALS = {
  email: "usuario@ejemplo.com",
  password: "fituser123",
};

// Clave para almacenar el token en localStorage
const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

/**
 * Simula un proceso de login
 */
export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  // Simular delay de una petición API
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (
    email === VALID_CREDENTIALS.email &&
    password === VALID_CREDENTIALS.password
  ) {
    // Simular token JWT
    const token = `mock-jwt-token-${Date.now()}`;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(MOCK_USER));
    return MOCK_USER;
  }

  return null;
};

/**
 * Simula un proceso de registro
 */
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<boolean> => {
  // Simular delay de una petición API
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simular validación de email único
  if (email === VALID_CREDENTIALS.email) {
    // El email ya está en uso
    return false;
  }

  // En un caso real, aquí guardaríamos el usuario en la base de datos
  console.log("Usuario registrado:", { email, name });
  return true;
};

/**
 * Cierra la sesión del usuario
 */
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

/**
 * Verifica si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Obtiene el usuario actual desde localStorage
 */
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

/**
 * Obtiene el token de autenticación
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Esta función será útil cuando tengas una API real
// export const setupAuthInterceptor = (axiosInstance: any) => {
//   axiosInstance.interceptors.request.use(
//     (config: any) => {
//       const token = getAuthToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error: any) => Promise.reject(error)
//   );
// };
