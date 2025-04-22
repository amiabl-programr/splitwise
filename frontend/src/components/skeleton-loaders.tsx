// components/Skeletons.tsx
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

// Sidebar skeleton
export function SidebarSkeleton() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="p-4">
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="h-px bg-border my-2" />
      <div className="p-4 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}
      </div>
    </div>
  )
}

// Group header skeleton
export function GroupHeaderSkeleton() {
  return (
    <header className="border-b p-4 bg-card flex justify-between items-center">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    </header>
  )
}

// Expense item skeleton
export function ExpenseItemSkeleton() {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-4 w-24 mt-1" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

// Expenses list skeleton
export function ExpensesListSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ExpenseItemSkeleton key={i} />
        ))}
      </div>
    </>
  )
}

// Balance item skeleton
export function BalanceItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  )
}

// Balances panel skeleton
export function BalancesPanelSkeleton() {
  return (
    <>
      <Skeleton className="h-7 w-24 mb-4" />
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <BalanceItemSkeleton key={i} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16" />
        </CardFooter>
      </Card>
    </>
  )
}

// Members panel skeleton
export function MembersPanelSkeleton() {
  return (
    <>
      <Skeleton className="h-7 w-24 mt-6 mb-4" />
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
