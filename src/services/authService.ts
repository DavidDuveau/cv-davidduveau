// src/services/authService.ts
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LoginRequest, LoginResponse, RegisterRequest, User } from '@/types/auth'

class AuthService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  setupInterceptors(): void {
    this.api.interceptors.request.use(config => {
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          this.logout()
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>('/auth/login', request)
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.error || 'Erreur de connexion')
      }
      throw new Error('Erreur de connexion')
    }
  }

  async register(request: RegisterRequest): Promise<User> {
    try {
      const response = await this.api.post<User>('/auth/register', request)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.error || 'Erreur d\'inscription')
      }
      throw new Error('Erreur d\'inscription')
    }
  }

  logout(): void {
    localStorage.removeItem('token')
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  getApi(): AxiosInstance {
    return this.api
  }
}

export const authService = new AuthService()