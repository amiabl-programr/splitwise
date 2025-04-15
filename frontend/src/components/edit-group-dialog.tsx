'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
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

interface Member {
  id: string
  name: string
  // Add other member properties as needed
}

interface Expense {
  id: string
  amount: number
  description: string
  // Add other expense properties as needed
}

interface Group {
  id: string
  name: string
  members: Member[]
  expenses: Expense[]
}

interface EditGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: Group
  onSubmit: (data: { name: string }) => void
}

export function EditGroupDialog({
  open,
  onOpenChange,
  group,
  onSubmit,
}: EditGroupDialogProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (open && group) {
      setName(group.name)
      setError('')
    }
  }, [open, group])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Group name is required')
      return
    }

    onSubmit({ name })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit group</DialogTitle>
            <DialogDescription>
              Change the details of your group.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Group name</Label>
              <Input
                id="name"
                placeholder="Trip to Paris, Apartment, etc."
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
