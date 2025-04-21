'use client'

import { createPost } from '@/actions/post.action'
import Container from '@/components/Container'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { TAGS } from '@/constants'
import { getTagText } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'

import { z } from 'zod'

const adminFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Nadpis článku je příliš krátký')
    .max(50, 'Nadpis článku je příliš dlouhý'),
  description: z
    .string()
    .min(2, 'Popis článku je příliš krátký')
    .max(400, 'Popis článku je příliš dlouhý'),
  images: z.array(z.string()).max(3, 'Můžeš zadat maximálně 3 URL obrázků'),
  tag: z.enum(TAGS, {
    required_error: 'Vyber tag článku',
    invalid_type_error: 'Vyber tag článku',
  }),
})

const AdminCreatePage = () => {
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      title: '',
      description: '',
      images: ['', '', ''],
      tag: undefined,
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof adminFormSchema>) {
    try {
      await createPost(values)
      router.push('/')
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <Container bgColor="bg-custom-yellow flex-1 py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-2xl mx-auto font-semibold tracking-wider"
        >
          <div className="grid grid-cols-6 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Nadpis článku</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="KaDÍ mlASkOlM?"
                      className="bg-muted border-transparent shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Zadejte nadpis článku. Měl by mít minimálně 2 znaky a
                    maximálně 50 znaků.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-muted border-transparent shadow-none w-full tracking-widest">
                        <SelectValue placeholder="tADY TaG" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TAGS.map((tag) => (
                        <SelectItem
                          key={tag}
                          value={tag}
                          className="tracking-widest"
                        >
                          {getTagText(tag)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Popis článku</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="sEl jSeM DO LEsa A zTRatIL jSeM se :-----("
                    className="bg-muted border-transparent shadow-none min-h-48 max-h-60"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Zadejte popis článku. Měl by mít minimálně 2 znaky a maximálně
                  400 znaků.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Obrázky (nepovinné, max 3)</FormLabel>
                <FormDescription>Můžeš přidat až 3 URL obrázků</FormDescription>
                <div className="space-y-2">
                  {[0, 1, 2].map((index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`images.${index}` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder={`URL obrázku ${index + 1}`}
                              className="bg-muted border-transparent shadow-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={'outline'}
            disabled={form.formState.isSubmitting}
            className="cursor-pointer w-full font-bold tracking-wider"
          >
            CAu cAU páPÁ
          </Button>
        </form>
      </Form>
    </Container>
  )
}

export default AdminCreatePage
