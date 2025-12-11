import { z } from 'zod'

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Name must be more than 3 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(
        /^(?!.*(\p{L})\1{2,})[\p{L}'’\-]+(?:\s[\p{L}'’\-]+)*$/u,
        'Names can only contain letters, spaces, hyphens, or apostrophes, and no letter can be repeated more than twice in a row.'
      ),
    email: z.email('Invalid email').trim(),
    password: z
      .string()
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,64}$/,
        'Passwords must contain uppercase letters, lowercase letters, numbers, and symbols.'
      ),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be more than 8 characters')
      .max(32, 'Confirm Password must be less than 32 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Password does not match',
    path: ['confirmPassword'],
  })

export type RegisterFormSchema = z.infer<typeof registerFormSchema>

export const userUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be more than 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^(?!.*(\p{L})\1{2,})[\p{L}'’\-]+(?:\s[\p{L}'’\-]+)*$/u,
      'Names can only contain letters, spaces, hyphens, or apostrophes, and no letter can be repeated more than twice in a row.'
    ),
})
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>

export const loginFormSchema = z.object({
  email: z.email('Invalid email').trim(),
  password: z.string().max(32, 'Password must be less than 32 characters'),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    newPassword: z
      .string()
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,64}$/,
        'Passwords must contain uppercase letters, lowercase letters, numbers, and symbols.'
      ),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be more than 8 characters')
      .max(32, 'Confirm Password must be less than 32 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: 'Password does not match',
    path: ['confirmPassword'],
  })

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

export const userSearchSchema = z.object({
  query: z.string().trim().optional().default(''),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(1))
    .optional()
    .default(1),
})
