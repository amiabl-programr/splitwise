import React from 'react'
import { Routes, Route } from 'react-router'
import { Home, NotFound } from './pages'
import Signup from './pages/Signup'
import { ProtectedLayout } from './route/protected-route'
import Dashboard from './pages/dashboard'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/Login'

const App: React.FC = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<ProtectedLayout />}></Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
