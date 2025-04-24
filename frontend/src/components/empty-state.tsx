import { Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onCreateGroup: () => void
}

export default function EmptyState({ onCreateGroup }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">No groups yet</h2>
        <p className="text-muted-foreground mb-6">
          Create a group to start splitting expenses with friends, roommates, or
          travel buddies.
        </p>
        <Button onClick={onCreateGroup}>
          <Plus className="h-4 w-4 mr-2" />
          Create a Group
        </Button>
      </div>
    </div>
  )
}
