'use client'

import { getContacts } from '@/lib/api/contact-api'
import { ContactResponse } from '@/types/contact'
import useSWR from 'swr'

const api_url = `${process.env.NEXT_PUBLIC_API_URL}/contacts`

export const useContacts = (params: Record<string, unknown>) => {
  const key = [`${api_url}`, JSON.stringify(params)]

  const { data, error, isLoading, mutate } = useSWR<ContactResponse>(
    key,
    async ([, str]) => {
      const parsed = JSON.parse(str)
      return getContacts(parsed)
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 10,
    }
  )

  return {
    contacts: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
