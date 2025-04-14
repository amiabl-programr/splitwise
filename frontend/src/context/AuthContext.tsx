import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { authApi } from '../api/auth'
import { User, AuthContextType } from '../types/auth'

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuthState = async (): Promise<void> => {
      try {
        // Try to get current user data from the server
        const userData = await authApi.getCurrentUser()
        setUser(userData)
        setIsAuthenticated(true)
        queryClient.setQueryData(['currentUser'], userData)
      } catch (error) {
        console.log('Not authenticated', error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthState()
  }, [queryClient])

  const login = useCallback(
    (userData: User): void => {
      setUser(userData)
      setIsAuthenticated(true)
      queryClient.setQueryData(['currentUser'], userData)
    },
    [queryClient]
  )

  const updateUser = useCallback(
    (userData: User): void => {
      setUser(userData)
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
      setUser(null)
      setIsAuthenticated(false)
      queryClient.clear()
      navigate('/login')
    }
  }, [queryClient, navigate])

  const value = useMemo<AuthContextType>(
    () => ({
      user,
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
