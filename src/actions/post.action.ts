'use server'

import { TPost } from '@/constants/types'
import { connectToDatabase } from '@/lib/utils'
import Post from '@/models/Post'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function createPost(post: Omit<TPost, 'postId'>) {
  try {
    const session = await getServerSession()
    if (!session?.user?.name) {
      throw new Error('Not logged in')
    }

    await connectToDatabase()

    await Post.create({
      postId: crypto.randomUUID(),
      ...post,
    })

    console.log('Post created:', post)
    revalidatePath('/')
  } catch (error) {
    console.error('Error creating post:', error)
  }
}

export async function updatePost(postId: string, post: Omit<TPost, 'postId'>) {
  try {
    const session = await getServerSession()
    if (!session?.user?.name) {
      throw new Error('Not logged in')
    }

    await connectToDatabase()

    await Post.updateOne({ postId }, { $set: post })

    console.log('Post updated:', postId)
    revalidatePath('/')
  } catch (error) {
    console.error('Error updating post:', error)
  }
}

export async function deletePost(postId: string) {
  try {
    const session = await getServerSession()
    if (!session?.user?.name) {
      throw new Error('Not logged in')
    }

    await connectToDatabase()

    await Post.deleteOne({ postId })

    console.log('Post deleted:', postId)
    revalidatePath('/')
  } catch (error) {
    console.error('Error deleting post:', error)
  }
}

// No perms
export async function getPosts(): Promise<TPost[]> {
  try {
    await connectToDatabase()

    const posts = await Post.find({}).sort({ createdAt: -1 })

    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// export async function getPostsByTag(tag: string): Promise<TPost[]> {
//   try {
//     await connectToDatabase()

//     const posts = await Post.find({ tags: tag }).sort({ createdAt: -1 })

//     return posts
//   } catch (error) {
//     console.error('Error fetching posts by tag:', error)
//     return []
//   }
// }

export async function getPostById(postId: string): Promise<TPost | null> {
  try {
    await connectToDatabase()

    const post = await Post.findOne({ postId })

    return JSON.parse(JSON.stringify(post))
  } catch (error) {
    console.error('Error fetching post by ID:', error)
    return null
  }
}
