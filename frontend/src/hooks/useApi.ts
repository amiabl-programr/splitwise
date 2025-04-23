'use client'

import { useState } from 'react'
import { handleApiError } from '@/api/group-api'
import type { ErrorResponse, FormattedError } from '../types/api'
import { AxiosError } from 'axios'

// Generic hook for API calls// Generic hook for API calls
export function useApi<T, P extends unknown[]>(
  apiFunction: (...args: P) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<FormattedError | null>(null)

  const execute = async (...args: P): Promise<T> => {
    setLoading(true)
    setError(null)

    try {
      const result = await apiFunction(...args)
      setData(result)
      return result
    } catch (err) {
      const formattedError = handleApiError(err as AxiosError<ErrorResponse>)
      setError(formattedError)
      throw formattedError
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    execute,
  }
}

// Example usage hooks for specific API calls
export function useCreateGroup() {
  return useApi((title: string, description: string) =>
    import('@/api/group-api').then((module) =>
      module.groupApi.createGroup(title, description)
    )
  )
}

export function useGetGroups() {
  return useApi(() =>
    import('@/api/group-api').then((module) => module.groupApi.getGroups())
  )
}

export function useDeleteGroup() {
  return useApi((groupId: string) =>
    import('@/api/group-api').then((module) =>
      module.groupApi.deleteGroup(groupId)
    )
  )
}

export function useUpdateGroup() {
  return useApi((groupId: string, title: string) =>
    import('@/api/group-api').then((module) =>
      module.groupApi.updateGroup(groupId, title)
    )
  )
}

export function useGetGroupMembers() {
  return useApi((groupId: string) =>
    import('@/api/group-api').then((module) =>
      module.groupApi.getGroupMembers(groupId)
    )
  )
}

export function useInviteUser() {
  return useApi((groupId: string, email: string) =>
    import('@/api/group-api').then((module) =>
      module.groupApi.inviteUser(groupId, email)
    )
  )
}

export function useCreateExpense() {
  return useApi((groupId: string, description: string, amount: number) =>
    import('@/api/group-api').then((module) =>
      module.expenseApi.createExpense(groupId, description, amount)
    )
  )
}

export function useUpdateExpense() {
  return useApi(
    (
      groupId: string,
      expenseId: string,
      data: { description?: string; amount?: number }
    ) =>
      import('@/api/group-api').then((module) =>
        module.expenseApi.updateExpense(groupId, expenseId, data)
      )
  )
}

export function useGetGroupExpenses() {
  return useApi((groupId: string) =>
    import('@/api/group-api').then((module) =>
      module.expenseApi.getGroupExpenses(groupId)
    )
  )
}

export function useDeleteExpense() {
  return useApi((expenseId: string) =>
    import('@/api/group-api').then((module) =>
      module.expenseApi.deleteExpense(expenseId)
    )
  )
}
