// types.ts
export interface Member {
  uid: string
  username: string
  email: string
}

export interface Expense {
  id: string
  description: string
  groupId: string
  amount: number
  payerId: string
  splits: Record<string, { amount: number; email: string; username: string }>
}

export interface Group {
  id: string
  name: string
  description: string
  ownerId: string
  members: Member[]
  expenses: Expense[]
}

export interface Balance {
  member: Member
  balance: number
}
