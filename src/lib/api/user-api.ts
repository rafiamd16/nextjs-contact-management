import { api } from '@/lib/axios'
import { UserResponse } from '@/types/user'

const api_url = '/auth/users'

export const getUsers = async (params: Record<string, unknown> = {}) => {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const url = query ? `${api_url}?${query}` : `${api_url}`
  const res = await api.get<UserResponse>(url)
  return res.data
}
