'use client'

import { getUsers } from '@/lib/api/user-api'
import { UserResponse } from '@/types/user'
import useSWR from 'swr'

const api_url = `${process.env.NEXT_PUBLIC_API_URL}/auth/users`

export const useUsers = (params: Record<string, any>) => {
  const key = [`${api_url}`, JSON.stringify(params)]

  const { data, error, isLoading, mutate } = useSWR<UserResponse>(
    key,
    async ([, str]) => {
      const parsed = JSON.parse(str)
      return getUsers(parsed)
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 10,
    },
  )

  return {
    users: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
