import { Plus, Users, Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Group } from '@/types/type'
import { SidebarSkeleton } from './skeleton-loaders'
import { useCurrentUser, useLogout } from '@/hooks/useAuthQuery'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

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
  const { data: currentUser } = useCurrentUser()
  const logoutMutation = useLogout()
  const email = currentUser?.email

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt={email || 'User'}
            />
            <AvatarFallback>
              {email ? email.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            {/* <h2 className="font-semibold truncate">{currentUser?.user.username || "Loading..."}</h2> */}
            <p className="font-semibold text-muted-foreground truncate">
              {email || '...'}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <span className="sr-only">Open user menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* App Title and Create Button */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Split Bill</h2>
        </div>
        <Button className="w-full" onClick={onCreateGroup}>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <Separator />
      <Separator />
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {isLoading ? (
            <SidebarSkeleton />
          ) : groups.length > 0 ? (
            // Groups list
            groups.map((group) => (
              <Button
                key={group.id}
                variant={selectedGroup?.id === group.id ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedGroup(group)}
              >
                <Users className="h-4 w-4 mr-2" />
                {group.name}
              </Button>
            ))
          ) : (
            // No groups message
            <div className="text-center text-muted-foreground py-4">
              <p>No groups yet</p>
              <p className="text-xs">Create your first group to get started</p>
            </div>
          )}
        </div>
      </ScrollArea>
      {/* Footer with logout */}
      <div className="p-4 border-t mt-auto">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
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
