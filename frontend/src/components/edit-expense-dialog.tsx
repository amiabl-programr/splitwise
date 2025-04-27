// components/edit-expense-dialog.tsx
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { Expense } from '@/types/type'
import { toast } from 'react-toastify'

interface EditExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense: Expense | null
  onSubmit: (data: { description: string; amount: number }) => Promise<boolean>
  isLoading: boolean
}

export function EditExpenseDialog({
  open,
  onOpenChange,
  expense,
  onSubmit,
  isLoading,
}: EditExpenseDialogProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Format amount with commas for thousands
  const formatAmount = (value: string | number) => {
    const numStr = value.toString()
    const parts = numStr.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }

  // Reset form when dialog opens with a new expense
  useEffect(() => {
    if (open && expense) {
      setFormData({
        description: expense.description,
        amount: formatAmount(expense.amount),
      })
      setErrors({})
    }
  }, [open, expense])

  const handleChange = (field: 'description' | 'amount', value: string) => {
    if (field === 'amount') {
      // Remove any non-digit or non-decimal characters except commas
      const sanitizedValue = value.replace(/[^\d.,]/g, '')
      // Parse the numeric value
      const numericValue = sanitizedValue.replace(/,/g, '')

      // Only update if it's empty or a valid number
      if (numericValue === '' || !isNaN(parseFloat(numericValue))) {
        // Format with commas for thousands
        value = formatAmount(numericValue)
      } else {
        return // Invalid input, don't update state
      }
    }

    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const { description, amount } = formData

    if (!description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required'
    } else {
      const numericAmount = Number.parseFloat(amount.replace(/,/g, ''))
      if (isNaN(numericAmount) || numericAmount <= 0) {
        newErrors.amount = 'Amount must be a positive number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Submit the form
    const success = await onSubmit({
      description: formData.description.trim(),
      amount: Number.parseFloat(formData.amount.replace(/,/g, '')),
    })

    if (success) {
      toast.success('Expense updated successfully!')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Update the expense details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Dinner, Tickets, etc."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  ₦
                </span>
                <Input
                  id="amount"
                  type="text"
                  placeholder="0.00"
                  value={formData.amount}
                  className="pl-7"
                  onChange={(e) => handleChange('amount', e.target.value)}
                  disabled={isLoading}
                  aria-label="Amount in Naira"
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-destructive">{errors.amount}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
