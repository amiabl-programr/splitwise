import React from 'react'
import { Routes, Route } from 'react-router'
import { Home, NotFound } from './pages'
import Signup from './pages/Signup'
import { ProtectedLayout } from './route/protected-route'
import Dashboard from './pages/dashboard'

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
