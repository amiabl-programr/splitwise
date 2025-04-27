import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Balance } from '@/types/type'
import { BalanceItemSkeleton } from './skeleton-loaders'
import { Loader2 } from 'lucide-react'
import { Badge } from './ui/badge'
import { formatMoney } from '@/utils/helper'

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
          <div className="h-[300px]">
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
                    key={member.uid}
                    className="flex items-center justify-between flex-wrap"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {member.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[100px] text-xs font-bold">
                        {member.username.length > 5
                          ? `${member.username.substring(0, 5)}...`
                          : member.username}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {balance > 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          gets {formatMoney(balance)}
                        </Badge>
                      ) : balance < 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          owes {formatMoney(-balance)}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-700 border-gray-200"
                        >
                          settled up
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 flex justify-between">
          <span className="text-sm text-muted-foreground">Total expenses</span>
          <span className="font-medium">{formatMoney(totalExpenses)}</span>
        </CardFooter>
      </Card>
    </>
  )
}
