import type React from 'react'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Receipt, Plus, Trash2 } from 'lucide-react'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { MotionItem } from '@/components/animations/motion-item'

// Interactive Demo Component
export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState('expenses')
  const [expenses, setExpenses] = useState([
    {
      id: '1',
      description: 'Dinner',
      amount: 120,
      paidBy: '1',
      date: '2023-06-16',
    },
    {
      id: '2',
      description: 'Movie tickets',
      amount: 45,
      paidBy: '2',
      date: '2023-06-17',
    },
  ])
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '1',
  })
  const [members] = useState([
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
  ])

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExpense.description || !newExpense.amount) return

    const expense = {
      id: Math.random().toString(36).substring(7),
      description: newExpense.description,
      amount: Number.parseFloat(newExpense.amount),
      paidBy: newExpense.paidBy,
      date: new Date().toISOString().split('T')[0],
    }

    setExpenses([...expenses, expense])
    setNewExpense({ description: '', amount: '', paidBy: '1' })
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const getMemberName = (memberId: string) => {
    const member = members.find((m) => m.id === memberId)
    return member ? member.name : 'Unknown'
  }

  const calculateBalances = () => {
    const balances: Record<string, number> = {}

    // Initialize balances for all members
    members.forEach((member) => {
      balances[member.id] = 0
    })

    // Calculate what each person paid
    expenses.forEach((expense) => {
      balances[expense.paidBy] += expense.amount
    })

    // Calculate the average each person should pay
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )
    const perPersonShare = totalExpenses / members.length

    // Adjust balances based on what each person should have paid
    members.forEach((member) => {
      balances[member.id] -= perPersonShare
    })

    return members.map((member) => ({
      member,
      balance: balances[member.id],
    }))
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      id="interactive-demo"
      className="scroll-mt-20"
    >
      <Card className="overflow-hidden border-2 shadow-lg">
        <CardContent className="p-0">
          <div className="bg-card p-4">
            <h3 className="text-xl font-bold">Trip to Paris</h3>
            <p className="text-sm text-muted-foreground">
              {members.length} members
            </p>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="px-4">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="expenses"
                  className="data-[state=active]:bg-background"
                >
                  Expenses
                </TabsTrigger>
                <TabsTrigger
                  value="balances"
                  className="data-[state=active]:bg-background"
                >
                  Balances
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="data-[state=active]:bg-background"
                >
                  Members
                </TabsTrigger>
              </TabsList>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="expenses" className="p-4 space-y-4">
                  <form onSubmit={handleAddExpense} className="grid gap-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          placeholder="e.g., Dinner, Taxi, etc."
                          value={newExpense.description}
                          onChange={(e) =>
                            setNewExpense({
                              ...newExpense,
                              description: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          min="0.01"
                          step="0.01"
                          value={newExpense.amount}
                          onChange={(e) =>
                            setNewExpense({
                              ...newExpense,
                              amount: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paidBy">Paid by</Label>
                      <select
                        id="paidBy"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newExpense.paidBy}
                        onChange={(e) =>
                          setNewExpense({
                            ...newExpense,
                            paidBy: e.target.value,
                          })
                        }
                      >
                        {members.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add Expense
                      </Button>
                    </motion.div>
                  </form>

                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {expenses.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Receipt className="mx-auto h-12 w-12 opacity-50 mb-2" />
                          <p>No expenses yet. Add your first expense!</p>
                        </div>
                      ) : (
                        <StaggerContainer staggerChildren={0.05}>
                          {expenses.map((expense) => (
                            <MotionItem key={expense.id}>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 400,
                                  damping: 17,
                                }}
                              >
                                <Card className="overflow-hidden">
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-medium">
                                          {expense.description}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                          {expense.date}
                                        </p>
                                        <div className="flex items-center mt-1">
                                          <span className="text-sm">
                                            Paid by
                                          </span>
                                          <Badge
                                            variant="outline"
                                            className="ml-2"
                                          >
                                            {getMemberName(expense.paidBy)}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <span className="font-semibold">
                                          ${expense.amount.toFixed(2)}
                                        </span>
                                        <motion.div
                                          whileHover={{ scale: 1.2 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() =>
                                              handleDeleteExpense(expense.id)
                                            }
                                          >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                          </Button>
                                        </motion.div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            </MotionItem>
                          ))}
                        </StaggerContainer>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="balances" className="p-4">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Who owes what</h4>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                          <StaggerContainer staggerChildren={0.05}>
                            {calculateBalances().map(({ member, balance }) => (
                              <MotionItem key={member.id}>
                                <motion.div
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 17,
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={
                                          member.avatarUrl || '/placeholder.svg'
                                        }
                                        alt={member.name}
                                      />
                                      <AvatarFallback>
                                        {member.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                  </div>
                                  <motion.span
                                    animate={{
                                      color:
                                        balance > 0
                                          ? '#16a34a'
                                          : balance < 0
                                            ? '#dc2626'
                                            : '#71717a',
                                    }}
                                    className="font-medium"
                                  >
                                    {balance > 0
                                      ? `gets $${balance.toFixed(2)}`
                                      : balance < 0
                                        ? `owes $${Math.abs(balance).toFixed(2)}`
                                        : `settled up`}
                                  </motion.span>
                                </motion.div>
                              </MotionItem>
                            ))}
                          </StaggerContainer>
                        </div>
                      </ScrollArea>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="rounded-lg border p-4 bg-muted/50"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Total expenses
                        </span>
                        <motion.span
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="font-medium"
                        >
                          $
                          {expenses
                            .reduce((sum, expense) => sum + expense.amount, 0)
                            .toFixed(2)}
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
                <TabsContent value="members" className="p-4">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      <StaggerContainer staggerChildren={0.05}>
                        {members.map((member) => (
                          <MotionItem key={member.id}>
                            <motion.div
                              whileHover={{ scale: 1.02, x: 5 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 17,
                              }}
                              className="flex items-center gap-3"
                            >
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={member.avatarUrl || '/placeholder.svg'}
                                  alt={member.name}
                                />
                                <AvatarFallback>
                                  {member.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {member.email}
                                </p>
                              </div>
                            </motion.div>
                          </MotionItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
