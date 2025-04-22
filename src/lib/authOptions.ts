import { Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { connectToDatabase } from './utils'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        await connectToDatabase()
        const user = await User.findOne({
          username: credentials.username,
        })
        if (!user) return null

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )
        if (!isPasswordValid) return null

        return { id: user.username, name: user.username, role: user.role }
      },
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      if (!session?.user?.name) return session

      await connectToDatabase()
      const user = await User.findOne({
        username: session.user.name,
      })

      session.user.role = user.role
      return session
    },
  },
}
