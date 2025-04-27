import type React from 'react'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  delay?: number
  staggerChildren?: number
  children: React.ReactNode
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerChildren = 0.1,
  ...props
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      {...props}
    >
      {children}
    </motion.div>
  )
}
