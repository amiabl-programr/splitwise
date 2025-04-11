import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Home, NotFound } from './pages'
import Signup from './pages/Signup'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
