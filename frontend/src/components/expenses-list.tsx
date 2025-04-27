import { Plus, Receipt, Trash2, Loader2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Expense, Member } from '@/types/type'
import { ExpenseItemSkeleton } from './skeleton-loaders'
import { formatMoney } from '@/utils/helper'

interface ExpensesListProps {
  expenses: Expense[]
  members: Member[]
  onAddExpense: () => void
  onDeleteExpense: (expense: Expense) => void
  onEditExpense: (expense: Expense) => void
  isLoading?: boolean
}

export default function ExpensesList({
  expenses,
  members,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
  isLoading = false,
}: ExpensesListProps) {
  const getMemberName = (memberId: string): string => {
    const member = members.find((m) => m.uid === memberId)
    return member ? member.username : 'Unknown'
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
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-lg">
                    {expense.description}
                  </CardTitle>
                  <div>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isLoading}
                      onClick={() => onEditExpense(expense)}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Paid by</span>
                    <Badge variant="outline">
                      {getMemberName(expense.payerId)}
                    </Badge>
                  </div>
                  <span className="text-lg font-semibold">
                    {formatMoney(expense.amount)}
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
