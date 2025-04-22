'use client'

import { Pen, Trash } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { deletePost } from '@/actions/post.action'
import { toast } from 'sonner'

const AdminButtons = ({ postId }: { postId: string }) => {
  return (
    <div className="absolute -top-3 -right-3 flex gap-1 [&>*]:size-8">
      <Button variant={'outline'} size={'icon'} aria-label="Edit post" asChild>
        <Link href={`/admin/post/${postId}`} className="cursor-pointer">
          <Pen />
        </Link>
      </Button>
      <Button
        onClick={async () => {
          const confirmDelete = window.confirm('ChcEŠ To FAKt Dát pRYč?')
          if (confirmDelete) {
            try {
              await deletePost(postId)
              toast.success('Příspěvek byl úspěšně smazán.')
            } catch (error) {
              if (error instanceof Error) {
                toast.error(error.message)
              } else {
                toast.error('An unknown error occurred.')
              }
            }
          }
        }}
        variant={'destructive'}
        size={'icon'}
        aria-label="Delete post"
        className="cursor-pointer"
      >
        <Trash />
      </Button>
    </div>
  )
}

export default AdminButtons
