import axiosInstance from './axios'
import type { AxiosError } from 'axios'
import type { ErrorResponse, FormattedError, ErrorType } from '../types/api'

// Group API functions
export const groupApi = {
  // Create a new group
  createGroup: async (title: string, description: string) => {
    try {
      const response = await axiosInstance.post('/api/create-group', {
        title,
        description,
      })
      return response.data
    } catch (error) {
      console.error('Error creating group:', error)
      throw error
    }
  },

  // Get all groups for the current user
  getGroups: async () => {
    try {
      const response = await axiosInstance.get('/api/groups')
      return response.data.groups
    } catch (error) {
      console.error('Error fetching groups:', error)
      throw error
    }
  },

  // Delete a group
  deleteGroup: async (groupId: string) => {
    try {
      const response = await axiosInstance.delete(`/api/groups/${groupId}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting group ${groupId}:`, error)
      throw error
    }
  },

  // Update a group's title
  updateGroup: async (groupId: string, title: string) => {
    try {
      const response = await axiosInstance.patch(`/api/groups/${groupId}`, {
        title,
      })
      return response.data
    } catch (error) {
      console.error(`Error updating group ${groupId}:`, error)
      throw error
    }
  },

  // Get all members of a group
  getGroupMembers: async (groupId: string) => {
    try {
      const response = await axiosInstance.get(`/api/groups/${groupId}/members`)
      return response.data.members
    } catch (error) {
      console.error(`Error fetching members for group ${groupId}:`, error)
      throw error
    }
  },

  // Invite a user to a group
  inviteUser: async (groupId: string, email: string) => {
    try {
      const response = await axiosInstance.post(
        `/api/groups/${groupId}/invite`,
        {
          email,
        }
      )
      return response.data
    } catch (error) {
      console.error(`Error inviting user ${email} to group ${groupId}:`, error)
      throw error
    }
  },
}

// Expense API functions
export const expenseApi = {
  // Create a new expense in a group
  createExpense: async (
    groupId: string,
    description: string,
    amount: number
  ) => {
    try {
      const response = await axiosInstance.post(
        `/api/${groupId}/create-expense`,
        {
          description,
          amount,
        }
      )
      return response.data
    } catch (error) {
      console.error('Error creating expense:', error)
      throw error
    }
  },

  // Update an existing expense
  updateExpense: async (
    groupId: string,
    expenseId: string,
    data: { description?: string; amount?: number }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/api/groups/${groupId}/expenses/${expenseId}`,
        data
      )
      return response.data
    } catch (error) {
      console.error(`Error updating expense ${expenseId}:`, error)
      throw error
    }
  },

  // Get all expenses for a group
  getGroupExpenses: async (groupId: string) => {
    try {
      const response = await axiosInstance.get(`/api/${groupId}/expenses`)
      return response.data.expenses
    } catch (error) {
      console.error(`Error fetching expenses for group ${groupId}:`, error)
      throw error
    }
  },

  // Delete an expense
  deleteExpense: async (expenseId: string) => {
    try {
      const response = await axiosInstance.delete(`/api/expenses/${expenseId}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting expense ${expenseId}:`, error)
      throw error
    }
  },
}

/// Error handling utility with proper typing
export const handleApiError = (
  error: AxiosError<ErrorResponse>
): FormattedError => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response
    const errorMessage = data?.message || 'An error occurred'

    let errorType: ErrorType
    switch (status) {
      case 400:
        errorType = 'validation'
        return { type: errorType, message: errorMessage || 'Invalid input' }
      case 401:
        errorType = 'auth'
        return { type: errorType, message: 'Authentication required' }
      case 403:
        errorType = 'permission'
        return {
          type: errorType,
          message: 'You do not have permission to perform this action',
        }
      case 404:
        errorType = 'notFound'
        return { type: errorType, message: 'Resource not found' }
      case 500:
      default:
        errorType = 'server'
        return {
          type: errorType,
          message: 'Server error, please try again later',
        }
    }
  } else if (error.request) {
    return {
      type: 'network',
      message: 'Network error, please check your connection',
    }
  } else {
    return {
      type: 'unknown',
      message: error.message || 'An unexpected error occurred',
    }
  }
}
