export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}
