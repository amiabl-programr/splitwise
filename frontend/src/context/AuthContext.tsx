import React, {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useCallback,
} from 'react'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useCurrentUser } from '../hooks/useAuthQuery'
import { authApi } from '../api/auth'
import { User, AuthContextType } from '../types/auth'

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: user, isLoading, isError } = useCurrentUser()

  const isAuthenticated = !!user && !isError

  const login = useCallback(
    (userData: User): void => {
      queryClient.setQueryData(['currentUser'], userData)
    },
    [queryClient]
  )

  const updateUser = useCallback(
    (userData: User): void => {
      queryClient.setQueryData(['currentUser'], userData)
    },
    [queryClient]
  )

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      queryClient.clear()
      navigate('/login')
    }
  }, [queryClient, navigate])

  const value = useMemo<AuthContextType>(
    () => ({
      user: user || null,
      isAuthenticated,
      isLoading,
      login,
      logout,
      updateUser,
    }),
    [user, isAuthenticated, isLoading, login, logout, updateUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
