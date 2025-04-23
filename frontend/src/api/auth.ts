import axiosInstance from './axios'
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      '/api/login',
      credentials
    )
    return response.data
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      '/api/signup',
      userData
    )
    return response.data
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(
      '/api/logout'
    )
    return response.data
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get('/api/me')
    return response.data.user
  },
}
