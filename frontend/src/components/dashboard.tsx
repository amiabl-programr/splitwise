'use client'

import { useState } from 'react'
import {
  Plus,
  Users,
  UserPlus,
  Trash2,
  Edit,
  Receipt,
  Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CreateGroupDialog } from '@/components/create-group-dialog'
import { CreateExpenseDialog } from '@/components/create-expense-dialog'
import { InviteDialog } from '@/components/invite-dialog'
import { EditGroupDialog } from '@/components/edit-group-dialog'
import { ConfirmDialog } from '@/components/confirm-dialog'

export default function Dashboard() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false)
  const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState(false)
  const [isDeleteExpenseOpen, setIsDeleteExpenseOpen] = useState(false)
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null)

  // Sample data
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Trip to Paris',
      members: [
        {
          id: '1',
          name: 'You',
          email: 'you@example.com',
          avatarUrl: '/placeholder.svg?height=40&width=40',
        },
        {
          id: '2',
          name: 'Alex',
          email: 'alex@example.com',
          avatarUrl: '/placeholder.svg?height=40&width=40',
        },
        {
          id: '3',
          name: 'Taylor',
          email: 'taylor@example.com',
          avatarUrl: '/placeholder.svg?height=40&width=40',
        },
      ],
      expenses: [
        {
          id: '1',
          description: 'Hotel',
          amount: 450,
          paidBy: '1',
          date: '2023-06-15',
        },
        {
          id: '2',
          description: 'Dinner',
          amount: 120,
          paidBy: '2',
          date: '2023-06-16',
        },
        {
          id: '3',
          description: 'Museum tickets',
          amount: 60,
          paidBy: '3',
          date: '2023-06-17',
        },
      ],
    },
    {
      id: '2',
      name: 'Apartment',
      members: [
        {
          id: '1',
          name: 'You',
          email: 'you@example.com',
          avatarUrl: '/placeholder.svg?height=40&width=40',
        },
        {
          id: '4',
          name: 'Jordan',
          email: 'jordan@example.com',
          avatarUrl: '/placeholder.svg?height=40&width=40',
        },
      ],
      expenses: [
        {
          id: '4',
          description: 'Rent',
          amount: 1200,
          paidBy: '1',
          date: '2023-07-01',
        },
        {
          id: '5',
          description: 'Utilities',
          amount: 150,
          paidBy: '4',
          date: '2023-07-05',
        },
      ],
    },
  ])

  // Set the first group as selected by default
  useState(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0])
    }
  })

  const handleCreateGroup = (data: {
    name: string
    members: { name: string; email: string; avatarUrl: string }[]
  }) => {
    const group = {
      ...data,
      id: Math.random().toString(36).substring(7),
      members: data.members.map((member) => ({
        ...member,
        id: Math.random().toString(36).substring(7),
      })),
      expenses: [],
    }
    setGroups([...groups, group])
    setSelectedGroup(group)
    setIsCreateGroupOpen(false)
  }

  const handleCreateExpense = (newExpense: Omit<Expense, 'id'>) => {
    if (!selectedGroup) return

    const expense = {
      ...newExpense,
      id: Math.random().toString(36).substring(7),
    }

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          expenses: [...group.expenses, expense],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    setSelectedGroup(
      updatedGroups.find((g) => g.id === selectedGroup.id) || null
    )
    setIsCreateExpenseOpen(false)
  }

  const handleInviteMember = (newMember: Omit<Member, 'id'>) => {
    if (!selectedGroup) return

    const member = {
      ...newMember,
      id: Math.random().toString(36).substring(7),
    }

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          members: [...group.members, member],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    setSelectedGroup(
      updatedGroups.find((g) => g.id === selectedGroup.id) || null
    )
    setIsInviteOpen(false)
  }

  const handleEditGroup = (updatedGroup: Partial<Group>) => {
    if (!selectedGroup) return

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          ...updatedGroup,
        }
      }
      return group
    })

    setGroups(updatedGroups)
    setSelectedGroup(
      updatedGroups.find((g) => g.id === selectedGroup.id) || null
    )
    setIsEditGroupOpen(false)
  }

  const handleDeleteGroup = () => {
    if (!selectedGroup) return

    const updatedGroups = groups.filter(
      (group) => group.id !== selectedGroup.id
    )
    setGroups(updatedGroups)
    setSelectedGroup(updatedGroups.length > 0 ? updatedGroups[0] : null)
    setIsDeleteGroupOpen(false)
  }

  const handleDeleteExpense = () => {
    if (!selectedGroup || !expenseToDelete) return

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          expenses: group.expenses.filter(
            (expense) => expense.id !== expenseToDelete.id
          ),
        }
      }
      return group
    })

    setGroups(updatedGroups)
    setSelectedGroup(
      updatedGroups.find((g) => g.id === selectedGroup.id) || null
    )
    setIsDeleteExpenseOpen(false)
    setExpenseToDelete(null)
  }

  const getMemberName = (memberId: string) => {
    if (!selectedGroup) return 'Unknown'
    const member = selectedGroup.members.find((m) => m.id === memberId)
    return member ? member.name : 'Unknown'
  }

  const calculateBalances = () => {
    if (!selectedGroup) return []

    const balances: Record<string, number> = {}

    // Initialize balances for all members
    selectedGroup.members.forEach((member) => {
      balances[member.id] = 0
    })

    // Calculate what each person paid
    selectedGroup.expenses.forEach((expense) => {
      balances[expense.paidBy] += expense.amount
    })

    // Calculate the average each person should pay
    const totalExpenses = selectedGroup.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )
    const perPersonShare = totalExpenses / selectedGroup.members.length

    // Adjust balances based on what each person should have paid
    selectedGroup.members.forEach((member) => {
      balances[member.id] -= perPersonShare
    })

    return selectedGroup.members.map((member) => ({
      member,
      balance: balances[member.id],
    }))
  }

  return (
    <div className="flex min-h-screen bg-background">
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
          <SidebarContent
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            onCreateGroup={() => setIsCreateGroupOpen(true)}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r bg-card h-dvh fixed">
        <SidebarContent
          groups={groups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          onCreateGroup={() => setIsCreateGroupOpen(true)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64 pl-0 pr-4 md:pr-0 h-dvh overflow-hidden">
        {selectedGroup ? (
          <>
            {/* Header */}
            <header className="border-b p-4 bg-card flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{selectedGroup.name}</h1>
                <p className="text-muted-foreground">
                  {selectedGroup.members.length} members
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsInviteOpen(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditGroupOpen(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteGroupOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </header>

            {/* Content */}
            <div className="flex-1 p-4 md:p-6 overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Expenses List */}
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Expenses</h2>
                    <Button onClick={() => setIsCreateExpenseOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {selectedGroup.expenses.length === 0 ? (
                      <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                          <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No expenses yet. Add your first expense!</p>
                        </CardContent>
                      </Card>
                    ) : (
                      selectedGroup.expenses.map((expense) => (
                        <Card key={expense.id}>
                          <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg">
                                {expense.description}
                              </CardTitle>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setExpenseToDelete(expense)
                                  setIsDeleteExpenseOpen(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <CardDescription>{expense.date}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span>Paid by</span>
                                <Badge variant="outline">
                                  {getMemberName(expense.paidBy)}
                                </Badge>
                              </div>
                              <span className="text-lg font-semibold">
                                ${expense.amount.toFixed(2)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>

                {/* Balances */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Balances</h2>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Who owes what</CardTitle>
                      <CardDescription>
                        Based on all expenses in this group
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                          {calculateBalances().map(({ member, balance }) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={member.avatarUrl}
                                    alt={member.name}
                                  />
                                  <AvatarFallback>
                                    {member.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                              </div>
                              <span
                                className={
                                  balance > 0
                                    ? 'text-green-600 font-medium'
                                    : balance < 0
                                      ? 'text-red-600 font-medium'
                                      : ''
                                }
                              >
                                {balance > 0
                                  ? `gets $${balance.toFixed(2)}`
                                  : balance < 0
                                    ? `owes $${Math.abs(balance).toFixed(2)}`
                                    : `settled up`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="bg-muted/50 flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total expenses
                      </span>
                      <span className="font-medium">
                        $
                        {selectedGroup.expenses
                          .reduce((sum, expense) => sum + expense.amount, 0)
                          .toFixed(2)}
                      </span>
                    </CardFooter>
                  </Card>

                  {/* Members */}
                  <h2 className="text-xl font-semibold mt-6 mb-4">Members</h2>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {selectedGroup.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-3"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={member.avatarUrl}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.charAt(0)}
                              </AvatarFallback>
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
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">No groups yet</h2>
              <p className="text-muted-foreground mb-6">
                Create a group to start splitting expenses with friends,
                roommates, or travel buddies.
              </p>
              <Button onClick={() => setIsCreateGroupOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create a Group
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <CreateGroupDialog
        open={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
        onSubmit={handleCreateGroup}
        title={''}
        description={''}
      />

      {selectedGroup && (
        <>
          <CreateExpenseDialog
            open={isCreateExpenseOpen}
            onOpenChange={setIsCreateExpenseOpen}
            onSubmit={handleCreateExpense}
            members={selectedGroup.members}
          />

          <InviteDialog
            open={isInviteOpen}
            onOpenChange={setIsInviteOpen}
            onSubmit={handleInviteMember}
          />

          <EditGroupDialog
            open={isEditGroupOpen}
            onOpenChange={setIsEditGroupOpen}
            group={selectedGroup}
            onSubmit={handleEditGroup}
          />

          <ConfirmDialog
            open={isDeleteGroupOpen}
            onOpenChange={setIsDeleteGroupOpen}
            title="Delete Group"
            description={`Are you sure you want to delete "${selectedGroup.name}"? This action cannot be undone.`}
            onConfirm={handleDeleteGroup}
          />

          <ConfirmDialog
            open={isDeleteExpenseOpen}
            onOpenChange={setIsDeleteExpenseOpen}
            title="Delete Expense"
            description={`Are you sure you want to delete "${expenseToDelete?.description}"? This action cannot be undone.`}
            onConfirm={handleDeleteExpense}
          />
        </>
      )}
    </div>
  )
}

// Sidebar component
function SidebarContent({
  groups,
  selectedGroup,
  setSelectedGroup,
  onCreateGroup,
}: {
  groups: Group[]
  selectedGroup: Group | null
  setSelectedGroup: (group: Group) => void
  onCreateGroup: () => void
}) {
  return (
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
      </ScrollArea>
    </div>
  )
}

// Types
interface Member {
  id: string
  name: string
  email: string
  avatarUrl: string
}

interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  date: string
}

interface Group {
  id: string
  name: string
  members: Member[]
  expenses: Expense[]
}
