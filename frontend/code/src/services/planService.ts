import axios from 'axios';
import { Plan } from '../types/user.types';

const API_URL = "http://127.0.0.1:8000/api";

export const createPlan = async (): Promise<Plan> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post(`${API_URL}/plans/create/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Error("No autenticado");
        }
        if (error.response?.status === 400 && error.response?.data?.detail === "Ya existe un plan para hoy") {
            throw new Error("Ya existe un plan para hoy");
        }
        throw error;
    }
};

export const getCurrentPlan = async (): Promise<Plan | null> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${API_URL}/plans/current/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const getPlanHistory = async (): Promise<Plan[]> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${API_URL}/plans/history/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener historial de planes:', error);
        return [];
    }
};

export const updatePlanProgress = async (planId: number, data: {
    meals_followed?: boolean;
    workout_done?: boolean;
    weight_kg?: number;
    mood?: number;
    feedback?: string;
}): Promise<Plan> => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.patch(`${API_URL}/plans/${planId}/progress/`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar progreso:', error);
        throw error;
    }
};

export const getRecentProgress = async () => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${API_URL}/progress/recent/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener progreso reciente:', error);
        return [];
    }
}; 