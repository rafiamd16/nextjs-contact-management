import { z } from 'zod'

export const addressFormSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().min(3),
  postal_code: z.string().min(3),
})

export const addressUpdateFormSchema = addressFormSchema.partial()

export type AddressFormSchema = z.infer<typeof addressFormSchema>
export type AddressUpdateFormSchema = z.infer<typeof addressUpdateFormSchema>
