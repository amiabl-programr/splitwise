import React, { useEffect, Suspense } from 'react'
import {
  SidebarSkeleton,
  GroupHeaderSkeleton,
  ExpensesListSkeleton,
  BalancesPanelSkeleton,
  MembersPanelSkeleton,
} from '@/components/skeleton-loaders'

// Dynamic imports for code splitting
const Sidebar = React.lazy(() => import('@/components/sidebar'))
const GroupHeader = React.lazy(() => import('@/components/group-header'))
const ExpensesList = React.lazy(() => import('@/components/expenses-list'))
const BalancesPanel = React.lazy(() => import('@/components/balances-panel'))
const MembersPanel = React.lazy(() => import('@/components/members-panel'))
const EmptyState = React.lazy(() => import('@/components/empty-state'))

import { useGroupDialogs } from '@/hooks/useGroupDialogs'
import { useGroups } from '@/hooks/useGroups'

export default function Dashboard() {
  const {
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
    refreshData,
  } = useGroups()

  const { dialogs, dialogStates, openDialog } = useGroupDialogs(
    selectedGroup,
    {
      onCreateGroup: handleCreateGroup,
      onEditGroup: (data) => handleUpdateGroup(data.name),
      onDeleteGroup: handleDeleteGroup,
      onInviteMember: (data) => handleInviteMember(data.email),
      onCreateExpense: handleCreateExpense,
      onDeleteExpense: handleDeleteExpense,
    },
    {
      creatingGroup: loadingStates.creatingGroup,
      updatingGroup: loadingStates.updatingGroup,
      deletingGroup: loadingStates.deletingGroup,
      invitingMember: loadingStates.invitingMember,
      creatingExpense: loadingStates.creatingExpense,
      deletingExpense: loadingStates.deletingExpense,
    }
  )

  // Initialize selected group when groups are loaded
  useEffect(() => {
    if (groups.length > 0 && !selectedGroup && !isLoading) {
      setSelectedGroup(groups[0])
    }
  }, [groups, selectedGroup, setSelectedGroup, isLoading])

  // Calculate total expenses amount
  const totalExpensesAmount = groupExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  )

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <>
          <GroupHeaderSkeleton />
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ExpensesListSkeleton />
              </div>
              <div>
                <BalancesPanelSkeleton />
                <MembersPanelSkeleton />
              </div>
            </div>
          </div>
        </>
      )
    }

    if (!selectedGroup) {
      return (
        <Suspense fallback={<div />}>
          <EmptyState onCreateGroup={() => openDialog('createGroup')} />
        </Suspense>
      )
    }

    return (
      <>
        <Suspense fallback={<GroupHeaderSkeleton />}>
          <GroupHeader
            group={selectedGroup}
            members={groupMembers}
            expenses={groupExpenses}
            onInvite={() => openDialog('invite')}
            onEdit={() => openDialog('editGroup')}
            onDelete={() => openDialog('deleteGroup')}
            onAddExpense={() => openDialog('createExpense')}
            isLoading={
              loadingStates.updatingGroup || loadingStates.deletingGroup
            }
          />
        </Suspense>

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Suspense fallback={<ExpensesListSkeleton />}>
                <ExpensesList
                  expenses={groupExpenses}
                  members={groupMembers}
                  onAddExpense={() => openDialog('createExpense')}
                  onDeleteExpense={(expense) => {
                    dialogStates.setExpenseToDelete(expense)
                    openDialog('deleteExpense')
                  }}
                  isLoading={
                    loadingStates.creatingExpense ||
                    loadingStates.deletingExpense ||
                    loadingStates.fetchingExpenses
                  }
                />
              </Suspense>
            </div>

            <div>
              <Suspense fallback={<BalancesPanelSkeleton />}>
                <BalancesPanel
                  balances={calculateBalances()}
                  totalExpenses={totalExpensesAmount}
                  isLoading={
                    loadingStates.updatingGroup ||
                    loadingStates.fetchingExpenses ||
                    loadingStates.fetchingMembers
                  }
                />
              </Suspense>

              <Suspense fallback={<MembersPanelSkeleton />}>
                <MembersPanel
                  members={groupMembers}
                  isLoading={
                    loadingStates.updatingGroup ||
                    loadingStates.fetchingMembers ||
                    loadingStates.invitingMember
                  }
                />
              </Suspense>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Function to refresh group data (members and expenses)
  const refreshGroupData = () => {
    if (selectedGroup) {
      refreshData.fetchGroupMembers(selectedGroup.id)
      refreshData.fetchGroupExpenses(selectedGroup.id)
    }
  }

  // Refresh data when selected group changes
  useEffect(() => {
    if (selectedGroup) {
      refreshGroupData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup?.id])

  return (
    <div className="flex min-h-screen bg-background">
      {isLoading ? (
        <div className="hidden fixed inset-y-0 left-0 md:block w-64 border-r bg-card z-10">
          <SidebarSkeleton />
        </div>
      ) : (
        <Sidebar
          groups={groups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          onCreateGroup={() => openDialog('createGroup')}
          isLoading={loadingStates.creatingGroup}
        />
      )}
      <div className="flex-1 flex flex-col md:ml-64 w-full mt-10 md:mt-0">
        {renderMainContent()}
      </div>
      {dialogs}
    </div>
  )
}
