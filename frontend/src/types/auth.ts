export interface User {
  id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (userData: User) => void
  logout: () => Promise<void>
  updateUser: (userData: User) => void
}

export interface AuthResponse {
  user: User
  message?: string
}
