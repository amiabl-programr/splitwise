// types.ts
export interface Member {
  id: string
  name: string
  email: string
  avatarUrl: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  date: string
}

export interface Group {
  id: string
  name: string
  members: Member[]
  expenses: Expense[]
}

export interface Balance {
  member: Member
  balance: number
}
