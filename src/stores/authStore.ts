// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import type { AuthState, User, LoginRequest } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: authService.isAuthenticated(),
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    async login(username: string, password: string): Promise<boolean> {
      this.loading = true
      this.error = null
      
      try {
        const loginRequest: LoginRequest = { username, password }
        const response = await authService.login(loginRequest)
        
        this.isAuthenticated = true
        this.user = response.user
        return true
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message
        } else {
          this.error = 'Une erreur inconnue est survenue'
        }
        return false
      } finally {
        this.loading = false
      }
    },

    logout(): void {
      authService.logout()
      this.isAuthenticated = false
      this.user = null
    },

    clearError(): void {
      this.error = null
    }
  },

  getters: {
    currentUser(): User | null {
      return this.user
    }
  }
})