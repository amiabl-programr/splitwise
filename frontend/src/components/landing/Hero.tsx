import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import dashboard from '/src/assets/landing_page/dashboard.png'

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 lg:px-16 pb-16 pt-24 md:pt-32 flex flex-col lg:flex-row gap-6 items-center">
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
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button
            variant="outline"
            className="border-rose-500 text-rose-500 hover:bg-rose-50 px-8 py-6 rounded-xl text-lg"
          >
            <Link to="/dashboard">Try Demo</Link>
          </Button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="relative shadow-2xl overflow-hidden ">
          <img
            src={dashboard}
            alt="Split-The-Cost App"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
