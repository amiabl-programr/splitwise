import React from 'react'

const Preview: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Live Preview
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        See how Split-The-Cost works in action.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Dashboard Overview',
            description: 'Get a quick summary of all your groups and balances.',
          },
          {
            title: 'Adding New Expenses',
            description: 'Adding expenses is as simple as a few taps.',
          },
          {
            title: 'Settling Up',
            description: 'See who owes what and settle up with ease.',
          },
        ].map((screenshot, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-[9/16] relative bg-gray-100">
              <img
                src={`/placeholder.svg?height=640&width=360&text=Screenshot+${index + 1}`}
                alt={screenshot.title}
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{screenshot.title}</h3>
              <p className="text-gray-600">{screenshot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Preview
