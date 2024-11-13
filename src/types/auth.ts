// src/types/auth.ts
export interface User {
  id: number
  username: string
  email: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  email: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  error: string | null
}