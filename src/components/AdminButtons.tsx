'use client'

import { Pen, Trash } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { deletePost } from '@/actions/post.action'

const AdminButtons = ({ postId }: { postId: string }) => {
  return (
    <div className="absolute -top-4 -right-4 flex gap-1 [&>button]:size-8 [&>button]:cursor-pointer">
      <Link href={`/admin/${postId}`}>
        <Button variant={'outline'} size={'icon'} aria-label="Edit post">
          <Pen />
        </Button>
      </Link>
      <Button
        onClick={() => {
          const confirmDelete = window.confirm('ChcEŠ To FAKt Dát pRYč?')
          if (confirmDelete) {
            deletePost(postId)
          }
        }}
        variant={'destructive'}
        size={'icon'}
        aria-label="Delete post"
      >
        <Trash />
      </Button>
    </div>
  )
}

export default AdminButtons
