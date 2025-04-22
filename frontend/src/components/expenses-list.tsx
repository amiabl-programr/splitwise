import { Plus, Receipt, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Expense, Member } from '@/types/type'
import { ExpenseItemSkeleton } from './skeleton-loaders'

interface ExpensesListProps {
  expenses: Expense[]
  members: Member[]
  onAddExpense: () => void
  onDeleteExpense: (expense: Expense) => void
  isLoading?: boolean
}

export default function ExpensesList({
  expenses,
  members,
  onAddExpense,
  onDeleteExpense,
  isLoading = false,
}: ExpensesListProps) {
  const getMemberName = (memberId: string): string => {
    const member = members.find((m) => m.id === memberId)
    return member ? member.name : 'Unknown'
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <Button onClick={onAddExpense} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Add Expense
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <>
            <ExpenseItemSkeleton />
            <ExpenseItemSkeleton />
          </>
        ) : expenses.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No expenses yet. Add your first expense!</p>
            </CardContent>
          </Card>
        ) : (
          expenses.map((expense) => (
            <Card key={expense.id}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">
                    {expense.description}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteExpense(expense)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-destructive" />
                    )}
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
    </>
  )
}
