import { Pagination } from '@/types/pagination'
import { User } from '@prisma/client'

export interface IUser {
  id: string
  name: string
  email: string
  role: string
  image: string | null | undefined
}

export interface UserResponse {
  data: User[]
  pagination: Pagination
}
