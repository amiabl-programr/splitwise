import type React from 'react'

import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface MotionCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
}

export function MotionCard({ children, ...props }: MotionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
