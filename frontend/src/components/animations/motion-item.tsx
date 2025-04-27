import type React from 'react'

import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface MotionItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
}

export function MotionItem({ children, ...props }: MotionItemProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={item} {...props}>
      {children}
    </motion.div>
  )
}
