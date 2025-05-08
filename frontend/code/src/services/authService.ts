import axios from 'axios';
import { User } from "../types/user.types";

const API_URL = "http://127.0.0.1:8000/api";

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export const login = async (email: string, password: string): Promise<User | null> => {
    try {
        const response = await axios.post(`${API_URL}/users/login/`, { email, password });
        const { access, refresh } = response.data;

        // Guardar los tokens en localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Obtener el perfil del usuario
        const user = await getProfile(access);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
        return user;
    } catch (error) {
        const err = error as any;
        console.error('Login error:', err.response?.data || err.message);
        return null;
    }
};

export const register = async (
    email: string,
    password: string,
    name: string,
    age?: number,
    sex?: string,
    height_cm?: number,
    weight_kg?: number,
    activity_level?: string,
    dietary_restrictions?: string[],
    goal?: string
): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await axios.post(`${API_URL}/users/register/`, {
            email,
            password,
            name,
            age: age || 18,  // Valor por defecto
            sex: sex || 'M',  // Valor por defecto
            height_cm: height_cm || 170,  // Valor por defecto
            weight_kg: weight_kg || 70,  // Valor por defecto
            activity_level: activity_level || 'moderate',  // Valor por defecto
            dietary_restrictions: dietary_restrictions || [],  // Valor por defecto
            goal: goal || 'maintain_weight',  // Valor por defecto
            accept_terms: true,  // Campo obligatorio
        });
        if (response.status === 201) {
            return { success: true };
        }
        return { success: false, message: 'Error desconocido al registrar' };
    } catch (error) {
        const err = error as any;
        const errorMessage = err.response?.data?.detail || err.response?.data?.email?.[0] || err.message;
        console.error('Register error:', err.response?.data || err.message);
        return { success: false, message: errorMessage || 'Error al registrar usuario' };
    }
};

export const logout = (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem(USER_DATA_KEY);
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('access_token');
};

export const getCurrentUser = (): User | null => {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem('access_token');
};

export async function getProfile(token: string): Promise<User> {
    const res = await fetch(`${API_URL}/users/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener perfil: " + (await res.text()));
    return await res.json();
}

export async function updateProfile(token: string, data: any): Promise<User> {
    const res = await fetch(`${API_URL}/users/profile/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar perfil: " + (await res.text()));
    return await res.json();
}