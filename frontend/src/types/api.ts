// Define API response types
export interface ApiResponse {
  success: boolean
  message?: string
}

export interface GroupResponse extends ApiResponse {
  groupId: string
  group: {
    id: string
    title: string
    description: string
  }
}

export interface GroupsResponse extends ApiResponse {
  groups: GroupData[]
}

export interface ExpenseResponse extends ApiResponse {
  expenseId: string
  expense: {
    id: string
    description: string
    amount: number
  }
}

export interface DeleteResponse extends ApiResponse {
  message: string
}

export interface ErrorResponse {
  message: string
  errors?: Record<string, string>
}

// Data types
export interface GroupData {
  id: string
  title: string
  description: string
  members: MemberData[]
}

export interface MemberData {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface ExpenseData {
  description: string
  amount: number
}

// Error types
export type ErrorType =
  | 'validation'
  | 'auth'
  | 'permission'
  | 'notFound'
  | 'server'
  | 'network'
  | 'unknown'

export interface FormattedError {
  type: ErrorType
  message: string
}

export interface Balance {
  member: MemberData
  balance: number
}
