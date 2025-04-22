import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { authApi } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import {
  LoginCredentials,
  RegisterData,
  User,
  AuthResponse,
} from '../types/auth'

export const useLogin = (): UseMutationResult<
  AuthResponse,
  AxiosError,
  LoginCredentials
> => {
  const { login } = useAuth()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const data = await authApi.login(credentials)
      return data
    },
    onSuccess: (data) => {
      login(data.user)
      console.log('Login successful:', data)
    },
  })
}

export const useRegister = (): UseMutationResult<
  AuthResponse,
  AxiosError,
  RegisterData
> => {
  return useMutation({
    mutationFn: (userData: RegisterData) => authApi.register(userData),
  })
}

export const useLogout = (): UseMutationResult<
  { message: string },
  AxiosError,
  void
> => {
  const { logout } = useAuth()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout()
    },
  })
}

export const useCurrentUser = (): UseQueryResult<User, AxiosError> => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    retry: (failureCount, error) => {
      // Don't retry on 401 errors
      if (error?.response?.status === 401) return false
      return failureCount < 2
    },
    staleTime: 5 * 60 * 1000,
  })
}
