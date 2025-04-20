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
            image: '/src/assets/landing_page/dashboard.png?url',
            title: 'Dashboard Overview',
            description: 'Get a quick summary of all your groups and balances.',
          },
          {
            image: '/src/assets/landing_page/expenses.png?url',
            title: 'Adding New Expenses',
            description: 'Adding expenses is as simple as a few taps.',
          },
          {
            image: '/src/assets/landing_page/balances.png?url',
            title: 'Settling Up',
            description: 'See who owes what and settle up with ease.',
          },
        ].map((screenshot, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg">
            <div className=" relative bg-gray-100">
              <img
                src={screenshot.image}
                alt={screenshot.title}
                className="object-cover h-[240px] w-full"
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
