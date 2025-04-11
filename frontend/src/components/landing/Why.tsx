import React from 'react'
import { Card, CardContent } from '../ui/card'

const Why: React.FC = () => {
  return (
    <section id="why-us" className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Why Choose Us
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Split-The-Cost stands out with these amazing features.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[
          {
            icon: '✅',
            title: 'Fast UI',
            description: 'Our app is designed for speed and ease of use.',
          },
          {
            icon: '🔁',
            title: 'Real-time Updates',
            description: 'Changes sync instantly across all devices.',
          },
          {
            icon: '🤝',
            title: 'Great for Any Group',
            description: "Whether it's 2 people or 20, we've got you covered.",
          },
          {
            icon: '🤖',
            title: 'Smart AI (coming)',
            description:
              'Soon our AI will help suggest fair splits based on usage.',
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className="rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6 flex items-start gap-4">
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Why
