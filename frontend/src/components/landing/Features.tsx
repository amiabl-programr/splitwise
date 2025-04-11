import React from 'react'
import { Card, CardContent } from '../ui/card'
const Features: React.FC = () => {
  return (
    <section id="features" className="bg-rose-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Core Features
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Everything you need to manage group expenses with ease.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🔐',
              title: 'Secure Login',
              description:
                'Protect your financial data with our secure authentication system.',
            },
            {
              icon: '👥',
              title: 'Create Groups',
              description:
                'Organize expenses by creating different groups for different purposes.',
            },
            {
              icon: '💸',
              title: 'Add Expenses',
              description:
                'Quickly add expenses and assign them to the right people.',
            },
            {
              icon: '📊',
              title: 'View Splits',
              description:
                'See who owes what at a glance with our intuitive dashboard.',
            },
            {
              icon: '✅',
              title: 'Settle Payments',
              description: "Mark expenses as settled once they've been paid.",
            },
            {
              icon: '📱',
              title: 'Cross-Platform',
              description: 'Access your expenses from any device, anywhere.',
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
