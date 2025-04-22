import { Plus, Users, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Group } from '@/types/type'
import { SidebarSkeleton } from './skeleton-loaders'

interface SidebarProps {
  groups: Group[]
  selectedGroup: Group | null
  setSelectedGroup: (group: Group) => void
  onCreateGroup: () => void
  isLoading?: boolean
}

export default function Sidebar({
  groups,
  selectedGroup,
  setSelectedGroup,
  onCreateGroup,
  isLoading = false,
}: SidebarProps) {
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Split Bill</h2>
      </div>
      <div className="p-4">
        <Button className="w-full" onClick={onCreateGroup}>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        {isLoading ? (
          <SidebarSkeleton />
        ) : (
          <div className="p-4 space-y-1">
            {groups.map((group) => (
              <Button
                key={group.id}
                variant={selectedGroup?.id === group.id ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedGroup(group)}
              >
                <Users className="h-4 w-4 mr-2" />
                {group.name}
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r bg-card">
        <SidebarContent />
      </div>
    </>
  )
}
