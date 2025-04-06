import React from 'react'
import { Button } from '../ui/button'

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Simplify group expenses. Settle up in seconds.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Split bills with roommates, travel buddies, or event attendees without
          the awkward money talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 rounded-xl text-lg transition-transform hover:scale-105">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="border-rose-500 text-rose-500 hover:bg-rose-50 px-8 py-6 rounded-xl text-lg"
          >
            Try Demo
          </Button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="relative w-[280px] h-[560px] md:w-[320px] md:h-[640px] rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-800">
          <img
            src="/placeholder.svg?height=640&width=320"
            alt="Split-The-Cost App"
            width={320}
            height={640}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
