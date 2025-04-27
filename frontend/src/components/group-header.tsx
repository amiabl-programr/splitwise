import { useState } from 'react'
import {
  UserPlus,
  Edit,
  Trash2,
  Loader2,
  Plus,
  MoreHorizontal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Expense, Group, Member } from '@/types/type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface GroupHeaderProps {
  group: Group
  members: Member[]
  expenses: Expense[]
  onInvite: () => void
  onEdit: () => void
  onDelete: () => void
  onAddExpense: () => void
  isLoading?: boolean
}

export default function GroupHeader({
  group,
  members,
  expenses,
  onInvite,
  onEdit,
  onDelete,
  onAddExpense,
  isLoading = false,
}: GroupHeaderProps) {
  // Use state to control the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleEdit = () => {
    // Close dropdown first
    setIsDropdownOpen(false)
    // Use setTimeout to ensure dropdown is closed before modal opens
    setTimeout(() => {
      onEdit()
    }, 0)
  }

  const handleDelete = () => {
    setIsDropdownOpen(false)
    setTimeout(() => {
      onDelete()
    }, 0)
  }

  return (
    <header className="border-b p-4 bg-card flex justify-between items-center">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground">
          {members.length} members · {expenses.length} expenses
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onInvite}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 md:mr-2 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4 md:mr-2" />
          )}
          <span className="hidden md:inline">Invite</span>
        </Button>
        <Button onClick={onAddExpense} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          {isLoading ? 'Adding...' : 'Add Expense'}
        </Button>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Group
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
