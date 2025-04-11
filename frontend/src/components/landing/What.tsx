import React from 'react'
import { Card, CardContent } from '../ui/card'

const What: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        What is Split-The-Cost?
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        A simple yet powerful app designed to make group expenses hassle-free
        for everyone.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-8">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold mb-2">Roommates</h3>
            <p className="text-gray-600">
              Track shared household expenses like rent, utilities, groceries,
              and split them fairly.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-8">
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-xl font-bold mb-2">Travel Buddies</h3>
            <p className="text-gray-600">
              Keep track of who paid for hotels, meals, and activities during
              your trips.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-8">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Event Planners</h3>
            <p className="text-gray-600">
              Organize group events and split costs for venues, food, and
              decorations.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default What
