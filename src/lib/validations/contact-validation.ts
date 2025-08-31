import { z } from 'zod'

export const contactFormSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().optional(),
  email: z.email().or(z.literal('')).optional(),
  phone: z
    .string()
    .min(10)
    .refine((v) => /^\+?[0-9\- ]{7,20}$/.test(v), 'Invalid phone'),
})

export const contactSearchSchema = z.object({
  query: z.string().trim().optional().default(''),
  filter: z.enum(['mine', '']).optional().default(''),
  page: z.coerce.number().int().min(1).default(1),
})

export const contactUpdateFormSchema = contactFormSchema.partial()

export type contactSearch = z.infer<typeof contactSearchSchema>
export type ContactFormSchema = z.infer<typeof contactFormSchema>
export type ContactUpdateFormSchema = z.infer<typeof contactUpdateFormSchema>
