import { UserPlus, Edit, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Group, Member } from '@/types/type'

interface GroupHeaderProps {
  group: Group
  members: Member[]
  onInvite: () => void
  onEdit: () => void
  onDelete: () => void
  isLoading?: boolean
}

export default function GroupHeader({
  group,
  members,
  onInvite,
  onEdit,
  onDelete,
  isLoading = false,
}: GroupHeaderProps) {
  return (
    <header className="border-b p-4 bg-card flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{group.name}</h1>
        <p className="text-muted-foreground">{members.length} members</p>
      </div>
      <div className="flex gap-2">
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
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 md:mr-2 animate-spin" />
          ) : (
            <Edit className="h-4 w-4 md:mr-2" />
          )}
          <span className="hidden md:inline">Edit</span>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 md:mr-2 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 md:mr-2" />
          )}
          <span className="hidden md:inline">Delete</span>
        </Button>
      </div>
    </header>
  )
}
