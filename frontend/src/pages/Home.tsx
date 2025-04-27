import React from 'react'
import Features from '@/components/landing/Features'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import How from '@/components/landing/How'
import Preview from '@/components/landing/Preview'
import What from '@/components/landing/What'
import Why from '@/components/landing/Why'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* What is Split-The-Cost Section */}
      <What />

      {/* Core Features Section */}
      <Features />

      {/* Live Preview Section */}
      <Preview />

      {/* How It Works Section */}
      <How />

      {/* Why Choose Us Section */}
      <Why />

      {/* Footer CTA Section */}
      <section className="bg-rose-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to split expenses without the drama?
          </h2>
          <p className="text-xl mb-8">Available on mobile & desktop</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-white text-rose-500 hover:bg-gray-100 px-8 py-6 rounded-xl text-lg transition-transform hover:scale-105">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-rose-500 px-8 py-6 rounded-xl text-lg"
              asChild
            >
              <a href="#interactive-demo">Try Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Split-The-Cost. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
