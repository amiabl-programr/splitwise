import axiosInstance from './axios'
import {
  LoginCredentials,
  RegisterData,
  User,
  AuthResponse,
} from '../types/auth'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      '/auth/login',
      credentials
    )
    return response.data
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      '/auth/register',
      userData
    )
    return response.data
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(
      '/auth/logout'
    )
    return response.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/auth/me')
    return response.data
  },
}
