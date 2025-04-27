'use client'

import { createUser } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { adminFormSchema } from '@/constants/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const AddUser = () => {
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof adminFormSchema>) {
    try {
      await createUser(values)
      router.push('/admin/manage')

      form.reset()

      toast.success('Kámoš byl úspěšně vytvořen.')
    } catch (error) {
      console.error('Error creating user:', error)
      toast.error('Chyba při vytváření kámoše.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl mx-auto font-semibold tracking-wider"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jméno"
                    className="bg-muted border-transparent shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Jméno uživatele.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heslo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Heslo"
                    className="bg-muted border-transparent shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Heslo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potvrzení hesla.</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Potvrzení hesla"
                    className="bg-muted border-transparent shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Potvrzení hesla</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          variant={'outline'}
          disabled={form.formState.isSubmitting}
          className="cursor-pointer w-full font-bold tracking-wider"
        >
          pRIDat kÁMOše
        </Button>
      </form>
    </Form>
  )
}

export default AddUser
