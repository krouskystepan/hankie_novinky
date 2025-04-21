import { getPostById } from '@/actions/post.action'
import { notFound } from 'next/navigation'
import EditForm from './EditForm'

const AdminUpdatePage = async ({
  params,
}: {
  params: Promise<{
    postId: string
  }>
}) => {
  const { postId } = await params

  const post = await getPostById(postId)

  if (!post) return notFound()

  return <EditForm postId={postId} post={post} />
}

export default AdminUpdatePage
