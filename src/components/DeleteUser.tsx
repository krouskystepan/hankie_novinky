'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { deleteUser } from '@/actions/user.action'
import { toast } from 'sonner'
import { deleteAdminFormSchema } from '@/constants/schema'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type DeleteUserProps = {
  users: {
    username: string
  }[]
}

const DeleteUser = ({ users }: DeleteUserProps) => {
  const form = useForm<z.infer<typeof deleteAdminFormSchema>>({
    resolver: zodResolver(deleteAdminFormSchema),
  })
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof deleteAdminFormSchema>) {
    try {
      await deleteUser(values)
      router.push('/admin/manage')
      toast.success('Kámoš byl úspěšně odebrán.')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Chyba při odebírání kámoše.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl mx-auto flex flex-col items-center font-semibold tracking-wider"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jméno</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-muted border-transparent shadow-none w-xs">
                  <SelectValue placeholder="Vyber kámoše" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.username} value={user.username}>
                      {user.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Jméno kámoše, kterého chceš odebrat.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={'outline'}
          className="w-xs cursor-pointer font-bold tracking-wider"
        >
          nSCHleDoVN kÁmO
        </Button>
      </form>
    </Form>
  )
}

export default DeleteUser
