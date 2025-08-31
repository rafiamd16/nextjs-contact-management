'use server'

import { auth, signIn, signOut } from '@/auth'
import { prisma } from '@/lib/prisma'
import {
  ChangePasswordSchema,
  changePasswordSchema,
  LoginFormSchema,
  loginFormSchema,
  RegisterFormSchema,
  registerFormSchema,
  userUpdateSchema,
  UserUpdateSchema,
} from '@/lib/validations/user-validation'
import { IUser } from '@/types/user'
import { compare, hash } from 'bcrypt-ts'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const signUpCredentials = async (data: RegisterFormSchema) => {
  const parsed = registerFormSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { name, email, password } = parsed.data

  const emailExists = await prisma.user.findUnique({ where: { email } })
  if (emailExists) {
    return { error: 'Email already exists' }
  }

  try {
    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
    revalidatePath('/login')
  } catch (error) {
    return { error: 'Failed to register' }
  }
}

export const signInCredentials = async (data: LoginFormSchema) => {
  const parsed = loginFormSchema.safeParse(data)

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { email } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) {
    return { error: 'Email or password is wrong' }
  }

  try {
    await signIn('credentials', { ...parsed.data, redirect: false })
    revalidatePath('/dashboard')
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email or password is wrong' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}

export const signInGoogle = async () => {
  await signIn('google', { redirectTo: '/dashboard' })
  revalidatePath('/dashboard')
}

export const signInGithub = async () => {
  await signIn('github', { redirectTo: '/dashboard' })
  revalidatePath('/dashboard')
}

export const signOutCredentials = async () => {
  await signOut({ redirectTo: '/' })
  revalidatePath('/')
}

export const updateUser = async (data: UserUpdateSchema) => {
  const session = await auth()
  if (!session?.user.id) redirect('/login')

  const parsed = userUpdateSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) throw new Error('User not found')

  if (user.name === parsed.data.name) return { error: 'Name is the same as before' }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { name: parsed.data.name },
    })
    revalidatePath('/dashboard/users/profile')
    return { message: 'success' }
  } catch (error) {
    return { error: 'Failed to update user' }
  }
}

export const getCurrentUser = async (): Promise<IUser | null> => {
  const session = await auth()
  if (!session?.user || !session.user.id) return null

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    })

    return user as IUser | null
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  const session = await auth()
  if (!session?.user.id || session.user.role !== 'admin') redirect('/login')

  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) return { error: 'User not found' }

    return user
  } catch (error) {
    return { error: 'Failed to get user' }
  }
}

export const deleteUserById = async (id: string) => {
  await getUserById(id)

  try {
    await prisma.user.delete({ where: { id } })
    revalidatePath('/dashboard/users')
    return { message: 'User deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete user' }
  }
}

export const deleteAllUsers = async () => {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') redirect('/login')

  try {
    await prisma.user.deleteMany()
    revalidatePath('/dashboard/users')
    return { message: 'All users deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete users' }
  }
}

export const changePassword = async (data: ChangePasswordSchema) => {
  const session = await auth()
  if (!session?.user || !session.user.id) redirect('/login')

  const parsed = changePasswordSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const { oldPassword, newPassword } = parsed.data

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return { error: 'User not found' }

  if (!user.password) {
    return {
      error: 'This account uses Google/Github login, password cannot be changed',
    }
  }

  const isValid = await compare(oldPassword, user.password)
  if (!isValid) return { error: 'Old password is wrong' }

  const isSamePassword = await compare(newPassword, user.password)
  if (isSamePassword) return { error: 'New password must be different from old password' }

  const hashedPassword = await hash(newPassword, 10)

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })
    revalidatePath('/dashboard/users/profile')
    return { message: 'Password changed successfully' }
  } catch (error) {
    return { error: 'Failed to change password' }
  }
}
