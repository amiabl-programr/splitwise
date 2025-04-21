'use client'

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

interface CreateGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    name: string
    members: { name: string; email: string; avatarUrl: string }[]
  }) => void
  title: string
  description: string
}

export function CreateGroupDialog({
  open,
  onOpenChange,
  onSubmit,
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
    onSubmit({
      name,
      members: [
        {
          name: 'You',
          email: 'you@example.com',
          avatarUrl: '/placeholder.svg?height=40&width=40',
        },
      ],
    })

    try {
      const res = await fetch('/api/create-group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include', // include cookies like session token
        body: JSON.stringify({ title: name, description }),
      })

      const data: CreateGroupDialogProps | { error: string } = await res.json()

      if (res.ok) {
        const groupData = data as CreateGroupDialogProps
        console.log(groupData)
      } else {
        setError(`Error: ${(data as { error: string }).error}`)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Unexpected error occurred.')
    }
    // Reset form
    setName('')
    setDescription('')
    setError('')
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
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Group Description</Label>
              <Input
                id="description"
                placeholder="Trip to Paris, Apartment, etc."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  setError('')
                }}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create group</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
