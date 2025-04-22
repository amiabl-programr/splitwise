import { useState } from 'react'
import { CreateGroupDialog } from '@/components/create-group-dialog'
import { CreateExpenseDialog } from '@/components/create-expense-dialog'
import { InviteDialog } from '@/components/invite-dialog'
import { EditGroupDialog } from '@/components/edit-group-dialog'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Group, Expense, Member } from '@/types/type'

type DialogName =
  | 'createGroup'
  | 'createExpense'
  | 'invite'
  | 'editGroup'
  | 'deleteGroup'
  | 'deleteExpense'

type DialogHandlers = {
  onCreateGroup: (data: {
    name: string
    description?: string
  }) => Promise<boolean>
  onEditGroup: (updatedGroup: Partial<Group>) => boolean
  onDeleteGroup: () => Promise<boolean>
  onInviteMember: (newMember: Omit<Member, 'id'>) => boolean
  onCreateExpense: (data: {
    description: string
    amount: number
  }) => Promise<boolean>
  onDeleteExpense: (expenseId: string) => Promise<boolean>
}

export function useGroupDialogs(
  selectedGroup: Group | null,
  handlers: DialogHandlers
) {
  // Dialog open states
  const [openDialogs, setOpenDialogs] = useState<Record<DialogName, boolean>>({
    createGroup: false,
    createExpense: false,
    invite: false,
    editGroup: false,
    deleteGroup: false,
    deleteExpense: false,
  })

  // Dialog data states
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null)

  const openDialog = (dialogName: DialogName) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogName]: true }))
  }

  const closeDialog = (dialogName: DialogName) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogName]: false }))
  }

  const setDialogOpen = (dialogName: DialogName, isOpen: boolean) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogName]: isOpen }))
  }

  // Render all dialogs
  const dialogs = (
    <>
      <CreateGroupDialog
        open={openDialogs.createGroup}
        onOpenChange={(open) => setDialogOpen('createGroup', open)}
        onSubmit={handlers.onCreateGroup}
      />

      {selectedGroup && (
        <>
          <CreateExpenseDialog
            open={openDialogs.createExpense}
            onOpenChange={(open) => setDialogOpen('createExpense', open)}
            onSubmit={handlers.onCreateExpense}
          />

          <InviteDialog
            open={openDialogs.invite}
            onOpenChange={(open) => setDialogOpen('invite', open)}
            onSubmit={handlers.onInviteMember}
          />

          <EditGroupDialog
            open={openDialogs.editGroup}
            onOpenChange={(open) => setDialogOpen('editGroup', open)}
            group={selectedGroup}
            onSubmit={handlers.onEditGroup}
          />

          <ConfirmDialog
            open={openDialogs.deleteGroup}
            onOpenChange={(open) => setDialogOpen('deleteGroup', open)}
            title="Delete Group"
            description={`Are you sure you want to delete "${selectedGroup.name}"? This action cannot be undone.`}
            onConfirm={handlers.onDeleteGroup}
          />

          <ConfirmDialog
            open={openDialogs.deleteExpense}
            onOpenChange={(open) => setDialogOpen('deleteExpense', open)}
            title="Delete Expense"
            description={`Are you sure you want to delete "${expenseToDelete?.description}"? This action cannot be undone.`}
            onConfirm={() =>
              expenseToDelete && handlers.onDeleteExpense(expenseToDelete.id)
            }
          />
        </>
      )}
    </>
  )

  return {
    dialogs,
    dialogStates: {
      expenseToDelete,
      setExpenseToDelete,
    },
    openDialog,
    closeDialog,
  }
}
