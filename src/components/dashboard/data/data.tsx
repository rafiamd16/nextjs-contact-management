'use client'

import AdminTableDashboard from '@/components/dashboard/data/admin/admin-table-dashboard'
import DataContainer from '@/components/dashboard/data/data-container'
import Header from '@/components/dashboard/data/header'
import UserTableDashboard from '@/components/dashboard/data/user/user-table-dashboard'
import { AdminDashboard, UserDashboard } from '@/types/dashboard'
import { IUser } from '@/types/user'
import { motion } from 'framer-motion'

interface Props {
  data: AdminDashboard
  user: IUser
  recentContacts: UserDashboard
}

const Data = ({ user, data, recentContacts }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {user?.role === 'admin' ? (
        <DataContainer>
          <Header
            title="All Users"
            mode="action"
            href="/dashboard/admin/users"
            btnText="Manage Users"
            description="A list of all users in the system"
          />
          <AdminTableDashboard data={data} />
        </DataContainer>
      ) : (
        <DataContainer>
          <Header
            title="Recent Contacts"
            mode="action"
            href="/dashboard/contacts"
            btnText="Manage Contacts"
            description="Your most recently added contacts"
          />
          <UserTableDashboard recentContacts={recentContacts} />
        </DataContainer>
      )}
    </motion.div>
  )
}

export default Data
