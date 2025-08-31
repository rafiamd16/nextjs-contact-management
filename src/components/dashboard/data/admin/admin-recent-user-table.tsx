'use client'

import { formatDate } from '@/lib/utils'
import { AdminDashboard } from '@/types/dashboard'
import Image from 'next/image'

interface Props {
  data: AdminDashboard
}

const AdminRecentUserTable = ({ data }: Props) => {
  return (
    <div className="space-y-6 overflow-hidden border-t pt-6">
      {data.users.recent.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={user.image ?? '/img/avatar-placeholder.png'}
              alt="avatar"
              width={32}
              height={32}
              className="max-w-full rounded-full object-cover"
            />
            <div className="">
              <h4 className="text-xs font-bold sm:text-sm">{user.name}</h4>
              <p className="text-[10px] text-neutral-500 sm:text-xs">{user.email}</p>
            </div>
          </div>
          <p className="text-xs font-bold sm:text-sm">{formatDate(user.createdAt)}</p>
        </div>
      ))}
    </div>
  )
}

export default AdminRecentUserTable
