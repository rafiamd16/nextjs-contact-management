'use client'

import UserTable from '@/components/admin/users/user-table'
import Header from '@/components/header'
import PaginationTemplate from '@/components/pagination'
import Index from '@/components/search'
import { useUsers } from '@/hooks/useUsers'
import { deleteAllUsers } from '@/lib/actions/user-action'
import { User } from '@prisma/client'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { FaUsers } from 'react-icons/fa6'

const UserWrapper = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const page = searchParams.get('page') || 1

  const params = useMemo(
    () => ({
      query,
      page,
    }),
    [query, page],
  )

  const { users, pagination, isLoading, mutate } = useUsers(params)
  const data: User[] = users

  return (
    <div className="mx-auto max-w-screen-xl">
      <Header
        title="User List"
        icon={<FaUsers size={32} className="text-primary" />}
        mode="default"
      />

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Index data={data} mutate={mutate} onDelete={deleteAllUsers} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <UserTable users={users} isLoading={isLoading} mutate={mutate} />
      </motion.div>

      <div className="mt-4 flex justify-center">
        <PaginationTemplate totalPages={pagination?.totalPages ?? 1} />
      </div>
    </div>
  )
}

export default UserWrapper
