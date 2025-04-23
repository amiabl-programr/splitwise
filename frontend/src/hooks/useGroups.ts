import { useState, useEffect } from 'react'
import { Group, Expense, Balance, Member } from '@/types/type'
import {
  useCreateGroup,
  useGetGroups,
  useDeleteGroup,
  useUpdateGroup,
  useCreateExpense,
  useDeleteExpense,
  useInviteUser,
  useGetGroupMembers,
  useGetGroupExpenses,
} from '@/hooks/useApi'

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [groupMembers, setGroupMembers] = useState<Member[]>([])
  const [groupExpenses, setGroupExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStates, setLoadingStates] = useState({
    creatingGroup: false,
    deletingGroup: false,
    updatingGroup: false,
    fetchingMembers: false,
    fetchingExpenses: false,
    creatingExpense: false,
    deletingExpense: false,
    invitingMember: false,
  })

  // API hooks
  const createGroupApi = useCreateGroup()
  const getGroupsApi = useGetGroups()
  const deleteGroupApi = useDeleteGroup()
  const updateGroupApi = useUpdateGroup()
  const getGroupMembersApi = useGetGroupMembers()
  const getGroupExpensesApi = useGetGroupExpenses()
  const createExpenseApi = useCreateExpense()
  const deleteExpenseApi = useDeleteExpense()
  const inviteUserApi = useInviteUser()

  // Fetch groups on mount
  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true)
      try {
        const fetchedGroups = await getGroupsApi.execute()

        // Transform to our app's Group type
        const transformedGroups = fetchedGroups.map(
          (group: { id: string; title: string; description: string }) => ({
            id: group.id,
            name: group.title,
            description: group.description,
            members: [],
            expenses: [],
          })
        )

        setGroups(transformedGroups)
        if (transformedGroups.length > 0) {
          setSelectedGroup(transformedGroups[0])
          if (transformedGroups[0].id) {
            fetchGroupMembers(transformedGroups[0].id)
            fetchGroupExpenses(transformedGroups[0].id)
          }
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

  // Fetch group members
  const fetchGroupMembers = async (groupId: string) => {
    setLoadingStates((prev) => ({ ...prev, fetchingMembers: true }))
    try {
      const members = await getGroupMembersApi.execute(groupId)
      setGroupMembers(members)
      return members
    } catch (error) {
      console.error('Failed to fetch group members:', error)
      return []
    } finally {
      setLoadingStates((prev) => ({ ...prev, fetchingMembers: false }))
    }
  }

  // Fetch group expenses
  const fetchGroupExpenses = async (groupId: string) => {
    setLoadingStates((prev) => ({ ...prev, fetchingExpenses: true }))
    try {
      const expenses = await getGroupExpensesApi.execute(groupId)
      setGroupExpenses(expenses)
      return expenses
    } catch (error) {
      console.error('Failed to fetch group expenses:', error)
      return []
    } finally {
      setLoadingStates((prev) => ({ ...prev, fetchingExpenses: false }))
    }
  }

  // Handle group selection change
  useEffect(() => {
    if (selectedGroup) {
      fetchGroupMembers(selectedGroup.id)
      fetchGroupExpenses(selectedGroup.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup?.id])

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
      const group: Group = {
        id: response.groupId,
        name: data.name,
        description: data.description || 'Group description',
        ownerId: response.ownerId || '',
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

  const handleUpdateGroup = async (title: string) => {
    if (!selectedGroup) return false

    setLoadingStates((prev) => ({ ...prev, updatingGroup: true }))
    try {
      await updateGroupApi.execute(selectedGroup.id, title)

      // Update local state with the new title
      const updatedGroups = groups.map((group) => {
        if (group.id === selectedGroup.id) {
          return {
            ...group,
            name: title,
          }
        }
        return group
      })

      setGroups(updatedGroups)
      setSelectedGroup({
        ...selectedGroup,
        name: title,
      })

      return true
    } catch (error) {
      console.error('Failed to update group:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, updatingGroup: false }))
    }
  }

  const handleCreateExpense = async (data: {
    description: string
    amount: number
  }) => {
    if (!selectedGroup) return false

    setLoadingStates((prev) => ({ ...prev, creatingExpense: true }))
    try {
      await createExpenseApi.execute(
        selectedGroup.id,
        data.description,
        data.amount
      )

      // Refresh expenses after creating a new one
      await fetchGroupExpenses(selectedGroup.id)
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

      // Refresh expenses after deleting one
      await fetchGroupExpenses(selectedGroup.id)
      return true
    } catch (error) {
      console.error('Failed to delete expense:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, deletingExpense: false }))
    }
  }

  const handleInviteMember = async (email: string) => {
    if (!selectedGroup) return false

    setLoadingStates((prev) => ({ ...prev, invitingMember: true }))
    try {
      await inviteUserApi.execute(selectedGroup.id, email)

      // Refresh members after inviting a new one
      await fetchGroupMembers(selectedGroup.id)
      return true
    } catch (error) {
      console.error('Failed to invite member:', error)
      return false
    } finally {
      setLoadingStates((prev) => ({ ...prev, invitingMember: false }))
    }
  }

  const calculateBalances = (): Balance[] => {
    if (!selectedGroup || !groupMembers.length || !groupExpenses.length)
      return []

    const balances: Record<string, number> = {}

    // Initialize balances to zero
    groupMembers.forEach((member) => {
      balances[member.uid] = 0
    })

    // Calculate what each person paid
    groupExpenses.forEach((expense) => {
      balances[expense.payerId] += expense.amount
    })

    // Calculate the fair share per person
    const totalExpenses = groupExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )
    const perPersonShare = totalExpenses / groupMembers.length

    // Adjust balances to show what each person owes or is owed
    groupMembers.forEach((member) => {
      balances[member.uid] -= perPersonShare
    })

    // Return the results as an array of member-balance pairs
    return groupMembers.map((member) => ({
      member,
      balance: balances[member.uid] || 0,
    }))
  }

  return {
    groups,
    selectedGroup,
    setSelectedGroup,
    groupMembers,
    groupExpenses,
    isLoading,
    loadingStates,
    handleCreateGroup,
    handleUpdateGroup,
    handleDeleteGroup,
    handleInviteMember,
    handleCreateExpense,
    handleDeleteExpense,
    calculateBalances,
    refreshData: {
      fetchGroupMembers,
      fetchGroupExpenses,
    },
  }
}
