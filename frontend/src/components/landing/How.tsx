import { ChevronRight } from 'lucide-react'
import React from 'react'

const How: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-rose-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Split-The-Cost makes expense sharing simple in just three steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '👥',
              title: 'Create Group',
              description:
                'Start by creating a group and inviting your friends, roommates, or travel buddies.',
            },
            {
              icon: '💵',
              title: 'Add Expenses',
              description:
                'Add expenses as they happen. Specify who paid and who should share the cost.',
            },
            {
              icon: '✅',
              title: 'Split & Settle',
              description:
                'View who owes what and settle up with your preferred payment method.',
            },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-4xl mb-6">
                {step.icon}
              </div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-full">
                    <ChevronRight className="text-rose-300" size={24} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default How
