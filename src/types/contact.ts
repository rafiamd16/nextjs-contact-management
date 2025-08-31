import { Pagination } from '@/types/pagination'

export interface Contact {
  id: string
  first_name: string
  last_name?: string | null | undefined
  email?: string | null | undefined
  phone: string
  user?: {
    name: string
    email: string
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface ContactResponse {
  data: Contact[]
  pagination: Pagination
}
