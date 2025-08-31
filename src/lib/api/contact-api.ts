import { api } from '@/lib/axios'
import { ContactResponse } from '@/types/contact'
const api_url = `${process.env.NEXT_PUBLIC_API_URL}/contacts`

export const getContacts = async (params: Record<string, any> = {}): Promise<ContactResponse> => {
  const query = new URLSearchParams(params).toString()
  const url = query ? `${api_url}?${query}` : `${api_url}`
  const res = await api.get<ContactResponse>(url)
  return res.data
}
