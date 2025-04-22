'use client'

import { updatePost } from '@/actions/post.action'
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
import { postFormSchema } from '@/constants/schema'
import { TPost } from '@/constants/types'
import { getTagText } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { z } from 'zod'

const EditForm = ({ postId, post }: { postId: string; post: TPost }) => {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post.title,
      description: post.description,
      images: post.images,
      tag: post.tag,
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    try {
      await updatePost(postId, values)
      router.push('/')
      toast.success('Příspěvek byl úspěšně upraven.')
    } catch (error) {
      console.error('Error creating post:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Chyba při vytváření příspěvku.')
      }
    }
  }

  return (
    <Container className="bg-custom-yellow flex-1 py-12">
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
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-muted border-transparent shadow-none w-full tracking-widest">
                        <SelectValue placeholder="Vyberte tag článku" />
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
                    Vyber tag článku. Můžeš vybrat pouze jeden tag.
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
            CAu cAU páPÁ EdIT
          </Button>
        </form>
      </Form>
    </Container>
  )
}

export default EditForm
