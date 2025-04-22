import { UserPlus, Edit, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Group } from '@/types/type'

interface GroupHeaderProps {
  group: Group
  onInvite: () => void
  onEdit: () => void
  onDelete: () => void
  isLoading?: boolean
}

export default function GroupHeader({
  group,
  onInvite,
  onEdit,
  onDelete,
  isLoading = false,
}: GroupHeaderProps) {
  return (
    <header className="border-b p-4 bg-card flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{group.name}</h1>
        <p className="text-muted-foreground">{group.members.length} members</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onInvite}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4 mr-2" />
          )}
          Invite
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Edit className="h-4 w-4 mr-2" />
          )}
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 mr-2" />
          )}
          Delete
        </Button>
      </div>
    </header>
  )
}
