// hooks/useGroups.ts
import { useState, useEffect } from 'react'
import { Group, Expense, Balance } from '@/types/type'
import {
  useCreateGroup,
  useGetGroups,
  useDeleteGroup,
  useCreateExpense,
  useDeleteExpense,
  useInviteUser,
} from '@/hooks/useApi'

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStates, setLoadingStates] = useState({
    creatingGroup: false,
    deletingGroup: false,
    creatingExpense: false,
    deletingExpense: false,
    updatingGroup: false,
    invitingMember: false,
  })

  const createGroupApi = useCreateGroup()
  const getGroupsApi = useGetGroups()
  const deleteGroupApi = useDeleteGroup()
  const createExpenseApi = useCreateExpense()
  const deleteExpenseApi = useDeleteExpense()
  const inviteUserApi = useInviteUser()

  // Fetch groups on mount
  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true)
      try {
        const fetchedGroups = await getGroupsApi.execute()
        console.log('Fetched groups:', fetchedGroups)
        const transformedGroups = fetchedGroups.map(
          (group: { id: string; title: string }) => ({
            id: group.id,
            name: group.title,
            members: [],
            expenses: [],
          })
        )

        setGroups(transformedGroups)
        if (transformedGroups.length > 0) {
          setSelectedGroup(transformedGroups[0])
        }
      } catch (error) {
        console.error('Failed to fetch groups:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateGroup = async (data: {
    name: string
    description?: string
  }) => {
    setLoadingStates((prev) => ({ ...prev, creatingGroup: true }))
    try {
      const response = await createGroupApi.execute(
        data.name,
        data.description || 'Group description'
      )
      const group = {
        id: response.groupId,
        name: data.name,
        expenses: [],
        members: [],
      }

      setGroups([...groups, group])
      setSelectedGroup(group)
      return true
    } catch (error) {
      console.error('Failed to create group:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, creatingGroup: false }))
    }
  }

  const handleDeleteGroup = async () => {
    if (!selectedGroup) return false

    setLoadingStates((prev) => ({ ...prev, deletingGroup: true }))
    try {
      await deleteGroupApi.execute(selectedGroup.id)
      const updatedGroups = groups.filter(
        (group) => group.id !== selectedGroup.id
      )
      setGroups(updatedGroups)
      setSelectedGroup(updatedGroups.length > 0 ? updatedGroups[0] : null)
      return true
    } catch (error) {
      console.error('Failed to delete group:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, deletingGroup: false }))
    }
  }

  const handleCreateExpense = async (data: {
    description: string
    amount: number
  }) => {
    if (!selectedGroup) return false

    setLoadingStates((prev) => ({ ...prev, creatingExpense: true }))
    try {
      const response = await createExpenseApi.execute(
        selectedGroup.id,
        data.description,
        data.amount
      )
      const expense = {
        id: response.expenseId,
        description: data.description,
        amount: data.amount,
        paidBy:
          selectedGroup.members.length > 0
            ? selectedGroup.members[0].id
            : 'unknown',
        date: new Date().toISOString().split('T')[0],
      }

      updateGroupWithNewExpense(selectedGroup.id, expense)
      return true
    } catch (error) {
      console.error('Failed to create expense:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, creatingExpense: false }))
    }
  }

  const handleDeleteExpense = async (expenseId: string) => {
    if (!selectedGroup) return false

    setLoadingStates((prev) => ({ ...prev, deletingExpense: true }))
    try {
      await deleteExpenseApi.execute(expenseId)
      updateGroupByRemovingExpense(selectedGroup.id, expenseId)
      return true
    } catch (error) {
      console.error('Failed to delete expense:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, deletingExpense: false }))
    }
  }

  const handleInviteMember = async (newMember: { email: string }) => {
    if (!selectedGroup) return false

    setLoadingStates((prev) => ({ ...prev, invitingMember: true }))
    try {
      await inviteUserApi.execute(selectedGroup.id, newMember.email)
      return true
    } catch (error) {
      console.error('Failed to invite member:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, invitingMember: false }))
    }
  }

  const handleEditGroup = (updatedGroup: Partial<Group>) => {
    if (!selectedGroup) return false

    setLoadingStates((prev) => ({ ...prev, updatingGroup: true }))
    try {
      const updatedGroups = groups.map((group) => {
        if (group.id === selectedGroup.id) {
          return { ...group, ...updatedGroup }
        }
        return group
      })

      setGroups(updatedGroups)
      setSelectedGroup(
        updatedGroups.find((g) => g.id === selectedGroup.id) || null
      )
      return true
    } catch (error) {
      console.error('Failed to edit group:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, updatingGroup: false }))
    }
  }

  const calculateBalances = (): Balance[] => {
    if (!selectedGroup) return []

    const balances: Record<string, number> = {}

    selectedGroup.members.forEach((member) => {
      balances[member.id] = 0
    })

    selectedGroup.expenses.forEach((expense) => {
      balances[expense.paidBy] += expense.amount
    })

    const totalExpenses = selectedGroup.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )
    const perPersonShare = totalExpenses / selectedGroup.members.length

    selectedGroup.members.forEach((member) => {
      balances[member.id] -= perPersonShare
    })

    return selectedGroup.members.map((member) => ({
      member,
      balance: balances[member.id],
    }))
  }

  // Helper functions to update groups
  const updateGroupWithNewExpense = (groupId: string, expense: Expense) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          expenses: [...group.expenses, expense],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    setSelectedGroup(updatedGroups.find((g) => g.id === groupId) || null)
  }

  const updateGroupByRemovingExpense = (groupId: string, expenseId: string) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          expenses: group.expenses.filter(
            (expense) => expense.id !== expenseId
          ),
        }
      }
      return group
    })

    setGroups(updatedGroups)
    setSelectedGroup(updatedGroups.find((g) => g.id === groupId) || null)
  }

  //   const updateGroupWithNewMember = (groupId: string, member: { email: string }) => {
  //     const updatedGroups = groups.map((group) => {
  //       if (group.id === groupId) {
  //         return {
  //           ...group,
  //           members: [...group.members, member],
  //         }
  //       }
  //       return group
  //     })

  //     setGroups(updatedGroups)
  //     setSelectedGroup(updatedGroups.find((g) => g.id === groupId) || null)
  //   }

  return {
    groups,
    selectedGroup,
    setSelectedGroup,
    isLoading,
    loadingStates,
    handleCreateGroup,
    handleEditGroup,
    handleDeleteGroup,
    handleInviteMember,
    handleCreateExpense,
    handleDeleteExpense,
    calculateBalances,
  }
}
