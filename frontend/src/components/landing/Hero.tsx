import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import InteractiveDemo from './InteractiveDemo'
import { ArrowRight, Sparkles } from 'lucide-react'
import { MotionItem } from '../animations/motion-item'

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 lg:px-16 pb-16 pt-24 md:pt-32 gap-6 items-center">
      <MotionItem>
        <p className="rounded-full w-fit mx-auto mb-4 border bg-background/95 px-4 py-2 text-sm shadow-xs backdrop-blur-sm flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span>Introducing a Way to Simplify Group Expenses</span>
        </p>
      </MotionItem>
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold sm:font-black uppercase tracking-tight sm:text-7xl mb-6">
          Simplify group expenses. Settle up in seconds.
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Split bills with roommates, travel buddies, or event attendees without
          the awkward money talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 rounded-xl text-lg transition-transform hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
          <a href="#interactive-demo">
            <Button
              size="lg"
              variant="outline"
              className="border-rose-500 text-rose-500 hover:bg-rose-50 px-8 py-6 rounded-xl text-lg"
            >
              Try Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <InteractiveDemo />
      </motion.div>
    </section>
  )
}

export default Hero
