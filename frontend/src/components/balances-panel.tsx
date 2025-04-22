// components/BalancesPanel.tsx
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Balance } from '@/types/type'
import { BalanceItemSkeleton } from './skeleton-loaders'
import { Loader2 } from 'lucide-react'

interface BalancesPanelProps {
  balances: Balance[]
  totalExpenses: number
  isLoading?: boolean
}

export default function BalancesPanel({
  balances,
  totalExpenses,
  isLoading = false,
}: BalancesPanelProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">Balances</h2>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Who owes what</CardTitle>
          <CardDescription>Based on all expenses in this group</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <BalanceItemSkeleton />
                  <BalanceItemSkeleton />
                  <BalanceItemSkeleton />
                </>
              ) : balances.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No balances to show. Add members and expenses to see balances.
                </div>
              ) : (
                balances.map(({ member, balance }) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={member.avatarUrl || '/placeholder.svg'}
                          alt={member.name}
                        />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
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
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="bg-muted/50 flex justify-between">
          <span className="text-sm text-muted-foreground">Total expenses</span>
          <span className="font-medium">${totalExpenses.toFixed(2)}</span>
        </CardFooter>
      </Card>
    </>
  )
}
