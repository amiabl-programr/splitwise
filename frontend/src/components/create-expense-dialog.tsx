import type React from 'react'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CreateExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { description: string; amount: number }) => void
}

export function CreateExpenseDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateExpenseDialogProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required'
    } else if (
      isNaN(Number.parseFloat(amount)) ||
      Number.parseFloat(amount) <= 0
    ) {
      newErrors.amount = 'Amount must be a positive number'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      description,
      amount: Number.parseFloat(amount),
    })

    // Reset form
    setDescription('')
    setAmount('')
    setErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add an expense</DialogTitle>
            <DialogDescription>
              Add a new expense to split with your group.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Dinner, Tickets, etc."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  setErrors({ ...errors, description: '' })
                }}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setErrors({ ...errors, amount: '' })
                }}
              />
              {errors.amount && (
                <p className="text-sm text-destructive">{errors.amount}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
