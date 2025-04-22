import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Member } from '@/types/type'
import { Loader2 } from 'lucide-react'

interface MembersPanelProps {
  members: Member[]
  isLoading?: boolean
}

export default function MembersPanel({
  members,
  isLoading = false,
}: MembersPanelProps) {
  return (
    <>
      <div className="flex items-center gap-2 mt-6 mb-4">
        <h2 className="text-xl font-semibold">Members</h2>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
      <Card>
        <CardContent className="p-4">
          {members.length === 0 ? (
            <div className="text-center py-2 text-muted-foreground">
              No members yet. Invite someone to join!
            </div>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={member.avatarUrl || '/placeholder.svg'}
                      alt={member.name}
                    />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {member.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
