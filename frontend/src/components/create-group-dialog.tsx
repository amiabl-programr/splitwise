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
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

interface CreateGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { name: string; description?: string }) => Promise<boolean>
  isLoading?: boolean
}

export function CreateGroupDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: CreateGroupDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Group name is required')
      return
    }

    const success = await onSubmit({
      name,
      description,
    })

    if (success) {
      toast.success('Group created successfully!')
      // Reset form on successful submission
      setName('')
      setDescription('')
      setError('')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new group</DialogTitle>
            <DialogDescription>
              Create a group to start splitting expenses with friends.
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
                disabled={isLoading}
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Group Description</Label>
              <Input
                id="description"
                placeholder="Optional description of your group"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create group'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
