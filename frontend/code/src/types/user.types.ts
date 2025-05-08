export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  age?: number;
  sex?: string;
  height_cm?: number;
  weight_kg?: number;
  activity_level?: string;
  dietary_restrictions?: string[];
  goal?: string;
  accept_terms?: boolean;
}

export interface Plan {
  id: number;
  user: number;
  date: string;
  meal_plan: { meals: any };
  workout_plan: { exercises: any };
  progress?: DailyProgress;
}

export interface DailyProgress {
  id: number;
  plan: number;
  meals_followed: boolean;
  workout_done: boolean;
  weight_kg?: number;
  bmi?: number;
  mood?: number;
  feedback?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  age?: number;
  sex?: string;
  height_cm?: number;
  weight_kg?: number;
  activity_level?: string;
  dietary_restrictions?: string[];
  goal?: string;
}