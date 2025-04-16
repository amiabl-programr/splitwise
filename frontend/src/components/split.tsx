const SplitBillPage = () => {
  const groups = [
    { name: 'Trip to Paris', color: 'bg-black' },
    { name: 'Apartment', color: 'bg-gray-400' },
    { name: 'WECANDOTHIS', color: 'bg-gray-400' },
  ]

  const expenses = [
    {
      title: 'Hotel',
      date: '2023-06-15',
      paidBy: 'You',
      amount: 450,
    },
    {
      title: 'Dinner',
      date: '2023-06-15',
      paidBy: 'Alex',
      amount: 120,
    },
    {
      title: 'Museum tickets',
      date: '2023-06-17',
      paidBy: 'Taylor',
      amount: 60,
    },
  ]

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100 flex flex-row gap-6 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-80 p-6 bg-white flex flex-col gap-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-black">Split Bill</h2>

        <button className="w-full px-6 py-3 bg-black text-white text-base rounded-md">
          Create Group
        </button>

        <div className="flex flex-col gap-3">
          {groups.map((group, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white p-2 rounded-md"
            >
              <div className={`w-12 h-12 ${group.color} rounded-full`} />
              <p className="text-base text-black">{group.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-black">Trip to Paris</h1>
          <div className="flex gap-3">
            <button className="px-4 py-1.5 bg-gray-200 rounded-md text-base text-black">
              Invite
            </button>
            <button className="px-4 py-1.5 bg-gray-200 rounded-md text-base text-black">
              Edit
            </button>
            <button className="px-4 py-1.5 bg-red-500 rounded-md text-base text-white">
              Delete
            </button>
          </div>
        </div>

        {/* Expenses Section */}
        <div>
          <h2 className="text-3xl font-bold text-black mb-4">Expenses</h2>
          <button className="px-6 py-3 bg-black text-white rounded-md mb-6">
            + Add Expense
          </button>

          <div className="flex flex-col gap-6">
            {expenses.map((expense, index) => (
              <div
                key={index}
                className="w-full max-w-md p-6 bg-white rounded-md flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-black">
                    {expense.title}
                  </h3>
                  <button className="text-red-500 text-base">🗑️</button>
                </div>
                <p className="text-base text-gray-500">{expense.date}</p>
                <div className="flex justify-between">
                  <span className="text-gray-500">Paid by</span>
                  <span className="text-gray-500 font-bold">
                    {expense.paidBy}
                  </span>
                </div>
                <p className="text-2xl font-bold text-black">
                  ${expense.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplitBillPage
