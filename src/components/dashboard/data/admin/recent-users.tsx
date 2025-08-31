'use client'

import AdminRecentUserTable from '@/components/dashboard/data/admin/admin-recent-user-table'
import DataContainer from '@/components/dashboard/data/data-container'
import Header from '@/components/dashboard/data/header'
import { AdminDashboard } from '@/types/dashboard'
import { motion } from 'framer-motion'

interface Props {
  recentUsers: AdminDashboard
}

const AdminRecentUsers = ({ recentUsers }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DataContainer>
        <Header title="Recent Users" description="Users joined recently" />

        <AdminRecentUserTable data={recentUsers} />
      </DataContainer>
    </motion.div>
  )
}

export default AdminRecentUsers
