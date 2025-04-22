import NextAuth, { Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { connectToDatabase } from '@/lib/utils'
import User from '@/models/User'

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

      connectToDatabase()
      const user = await User.findOne({
        username: session.user.name,
      })

      session.user.role = user.role
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
