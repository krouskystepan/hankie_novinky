'use server'

import { getServerSession } from 'next-auth'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/utils'
import Admin from '@/models/Admin'

export async function getAdmin({ username }: { username: string }) {
  try {
    await connectToDatabase()
    const admin = await Admin.findOne({ username })

    if (!admin) {
      throw new Error('Admin not found')
    }

    revalidatePath('/')
    return admin
  } catch (error) {
    console.error('Error fetching admin:', error)
  }
}

export async function createAdmin({
  username,
  password,
}: {
  username: string
  password: string
}) {
  console.log('createAdmin', username, password)
  try {
    const session = await getServerSession()
    if (!session?.user?.name) {
      throw new Error('Not logged in')
    }

    await connectToDatabase()

    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      throw new Error('Username already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await Admin.create({
      adminId: crypto.randomUUID(),
      username,
      password: hashedPassword,
    })

    console.log(`Admin ${username} created`)
    revalidatePath('/')
  } catch (error) {
    console.error('Error creating admin:', error)
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
    const session = await getServerSession()
    if (!session?.user?.name) {
      throw new Error('Not logged in')
    }

    await connectToDatabase()

    const admin = await Admin.findOne({ username })
    if (!admin) {
      throw new Error('Admin not found')
    }

    const passwordMatch = await bcrypt.compare(oldPassword, admin.password)
    if (!passwordMatch) {
      throw new Error('Old password is incorrect')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    admin.password = hashedPassword
    await admin.save()

    console.log(`Password for ${username} changed`)
    revalidatePath('/')
  } catch (error) {
    console.error('Error changing password:', error)
  }
}
