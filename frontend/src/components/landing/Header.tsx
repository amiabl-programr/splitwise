'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Why Choose Us', href: '#why-us' },
]

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-2xl font-bold text-rose-500"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            SplitWise
          </motion.span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
              >
                <a
                  href={item.href}
                  className="text-gray-600 hover:text-rose-500 transition-colors relative group"
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </a>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button
              variant="outline"
              className="border-rose-500 text-rose-500 hover:bg-rose-50"
            >
              Sign In
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
              <Link to="/signup">Get Started</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-gray-600 hover:text-rose-500 focus:outline-none"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-rose-500 transition-colors text-lg block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                className="flex flex-col gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="border-rose-500 text-rose-500 hover:bg-rose-50 w-full"
                >
                  Sign In
                </Button>
                <Button className="bg-rose-500 hover:bg-rose-600 text-white w-full">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
