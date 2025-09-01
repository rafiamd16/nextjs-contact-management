import { prisma } from '@/lib/prisma'
import { loginFormSchema } from '@/lib/validations/user-validation'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Prisma } from '@prisma/client'
import { compare } from 'bcrypt-ts'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = loginFormSchema.safeParse(credentials)
        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data

        const user = await prisma.user.findUnique({
          where: { email },
        })
        if (!user || !user.password) {
          throw new Error('Email or password is wrong')
        }

        const isValid = await compare(password, user.password)
        if (!isValid) return null

        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLogin: new Date(),
          } as Prisma.UserUpdateInput,
        })

        return user
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const path = nextUrl.pathname
      const protectedRoutes = ['/dashboard', '/dashboard/admin']

      if (!isLoggedIn && protectedRoutes.some((route) => path.startsWith(route)))
        return Response.redirect(new URL('/login', nextUrl))

      if (isLoggedIn && path.startsWith('/login'))
        return Response.redirect(new URL('/dashboard', nextUrl))

      if (isLoggedIn && auth?.user?.role !== 'admin' && path.startsWith('/dashboard/admin')) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },
    async signIn({ user }) {
      if (user?.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLogin: new Date(),
          } as Prisma.UserUpdateInput,
        })
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },

    session({ session, token }) {
      session.user.id = token.sub
      session.user.role = token.role
      return session
    },
  },
})
