import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'

export const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative">
          <span className="inline-block h-12 w-12 rounded-full border-4 border-black border-t-transparent animate-spin shadow-lg" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="block h-4 w-4 bg-black rounded-full opacity-80 animate-pulse" />
          </span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}
