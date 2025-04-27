'use server'

import { getServerSession } from 'next-auth'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/utils'
import User from '@/models/User'
import { authOptions } from '@/lib/authOptions'

export async function getUser({ username }: { username: string }) {
  try {
    await connectToDatabase()
    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('User not found')
    }

    revalidatePath('/')
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export async function getAllUsersUsernames() {
  try {
    await connectToDatabase()

    const users = await User.find({})
      .select('username -_id')
      .lean<{ username: string }[]>()

    return users
  } catch (error) {
    console.error('Error fetching all users:', error)
  }
}

export async function createUser({
  username,
  password,
}: {
  username: string
  password: string
}) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== 'admin') {
      throw new Error('Na to nemáte oprávnění')
    }

    await connectToDatabase()

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      throw new Error('Jméno uživatele už existuje')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      userId: crypto.randomUUID(),
      username,
      password: hashedPassword,
    })

    console.log(`User ${username} created`)
    revalidatePath('/admin/manage')
  } catch (error) {
    console.error('Error creating user:', error)
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Chyba při vytváření uživatele')
    }
  }
}

export async function deleteUser({ username }: { username: string }) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== 'admin') {
      throw new Error('Na to nemáte oprávnění')
    }

    await connectToDatabase()

    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('User not found')
    }
    await User.deleteOne({ username })

    console.log(`User ${username} deleted`)
    revalidatePath('/admin/manage')
  } catch (error) {
    console.error('Error deleting user:', error)
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Chyba při mazání uživatele')
    }
  }
}

export async function changePassword({
  username,
  oldPassword,
  newPassword,
}: {
  username: string
  oldPassword: string
  newPassword: string
}) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.name) {
      throw new Error('Not logged in')
    }

    await connectToDatabase()

    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('User not found')
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password)
    if (!passwordMatch) {
      throw new Error('Old password is incorrect')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()

    console.log(`Password for ${username} changed`)
    revalidatePath('/')
  } catch (error) {
    console.error('Error changing password:', error)
  }
}
