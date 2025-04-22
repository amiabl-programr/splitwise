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
    isLoading,
    loadingStates,
    handleCreateGroup,
    handleEditGroup,
    handleDeleteGroup,
    handleInviteMember,
    handleCreateExpense,
    handleDeleteExpense,
    calculateBalances,
  } = useGroups()

  const { dialogs, dialogStates, openDialog } = useGroupDialogs(selectedGroup, {
    onCreateGroup: handleCreateGroup,
    onEditGroup: handleEditGroup,
    onDeleteGroup: handleDeleteGroup,
    onInviteMember: handleInviteMember,
    onCreateExpense: handleCreateExpense,
    onDeleteExpense: handleDeleteExpense,
  })

  // Initialize selected group when groups are loaded
  useEffect(() => {
    if (groups.length > 0 && !selectedGroup && !isLoading) {
      setSelectedGroup(groups[0])
    }
  }, [groups, selectedGroup, setSelectedGroup, isLoading])

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
            onInvite={() => openDialog('invite')}
            onEdit={() => openDialog('editGroup')}
            onDelete={() => openDialog('deleteGroup')}
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
                  expenses={selectedGroup.expenses}
                  members={selectedGroup.members}
                  onAddExpense={() => openDialog('createExpense')}
                  onDeleteExpense={(expense) => {
                    dialogStates.setExpenseToDelete(expense)
                    openDialog('deleteExpense')
                  }}
                  isLoading={
                    loadingStates.creatingExpense ||
                    loadingStates.deletingExpense
                  }
                />
              </Suspense>
            </div>

            <div>
              <Suspense fallback={<BalancesPanelSkeleton />}>
                <BalancesPanel
                  balances={calculateBalances()}
                  totalExpenses={selectedGroup.expenses.reduce(
                    (sum, expense) => sum + expense.amount,
                    0
                  )}
                  isLoading={loadingStates.updatingGroup}
                />
              </Suspense>

              <Suspense fallback={<MembersPanelSkeleton />}>
                <MembersPanel
                  members={selectedGroup.members}
                  isLoading={loadingStates.updatingGroup}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {isLoading ? (
        <div className="hidden md:block w-64 border-r bg-card">
          <SidebarSkeleton />
        </div>
      ) : (
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            onCreateGroup={() => openDialog('createGroup')}
            isLoading={loadingStates.creatingGroup}
          />
        </Suspense>
      )}

      <div className="flex-1 flex flex-col">{renderMainContent()}</div>

      {dialogs}
    </div>
  )
}
