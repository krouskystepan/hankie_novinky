import { getPostById } from '@/actions/post.action'
import { notFound } from 'next/navigation'
import React from 'react'

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{
    postId: string
  }>
}) => {
  const { postId } = await params
  const post = await getPostById(postId)

  if (!post) return notFound()

  return children
}

export default layout
