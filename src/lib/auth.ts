import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    {
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // This is where you'd typically verify credentials against your database
        // For now, we'll use a simple demo approach
        
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Mock user verification - in production, verify against database
        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string
          }
        })

        if (!user) {
          // Create a new user for demo purposes
          const newUser = await db.user.create({
            data: {
              email: credentials.email as string,
              name: credentials.email as string, // Use email as name for demo
            }
          })
          return newUser
        }

        return user
      }
    }
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.plan = user.plan
        token.creditsUsed = user.creditsUsed
        token.creditsLimit = user.creditsLimit
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.plan = token.plan as string
        session.user.creditsUsed = token.creditsUsed as number
        session.user.creditsLimit = token.creditsLimit as number
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
}