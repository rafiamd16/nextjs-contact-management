'use client'

import Card from '@/components/dashboard/stats-card/card'
import { AdminDashboard, UserDashboard } from '@/types/dashboard'
import { IUser } from '@/types/user'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaAddressBook, FaUserCheck, FaUserPlus, FaUsers } from 'react-icons/fa6'

interface Props {
  userStats: UserDashboard
  adminStats: AdminDashboard
  user: IUser
}

const StatsCard = ({ userStats, adminStats, user }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {user?.role === 'admin' ? (
        <>
          <Card
            icon={<FaUsers className="text-xl text-purple-600" />}
            label="Total Users"
            value={adminStats.users.total}
            description={`+${adminStats.users.growth} from last week`}
            className="bg-purple-100"
            borderColor="border-purple-500"
          />
          <Card
            icon={<FaAddressBook className="text-xl text-green-600" />}
            label="Total Contacts"
            value={adminStats.contacts.total}
            description={`+${adminStats.contacts.growth} from last week`}
            className="bg-green-100"
            borderColor="border-green-500"
          />
          <Card
            icon={<FaUserCheck className="text-xl text-blue-600" />}
            label="Active Users"
            value={adminStats.users.activeLast30Days}
            description="Last 30 days"
            className="bg-blue-100"
            borderColor="border-blue-500"
          />
          <Card
            icon={<FaUserPlus className="text-xl text-yellow-600" />}
            label="New Users"
            value={adminStats.users.newThisWeek}
            description="This Week"
            className="bg-yellow-100"
            borderColor="border-yellow-500"
          />
        </>
      ) : (
        <>
          <Card
            icon={<FaUsers className="text-xl text-blue-600" />}
            label="Total Contacts"
            value={userStats.contacts.total}
            description={`+${userStats.contacts.growth} from last month`}
            className="bg-blue-100"
            borderColor="border-blue-500"
          />
          <Card
            icon={<FaUserPlus className="text-xl text-green-600" />}
            label="Recent Contacts"
            value={userStats.contacts.recentThisWeek}
            description="Added this week"
            className="bg-green-100"
            borderColor="border-green-500"
          />
          <Card
            icon={<FaMapMarkerAlt className="text-xl text-purple-600" />}
            label="Addresses"
            value={userStats.addresses.total}
            description="Total Saved"
            className="bg-purple-100"
            borderColor="border-purple-500"
          />
          <Card
            icon={<FaUserPlus className="text-xl text-yellow-600" />}
            label="New Addresses"
            value={userStats.addresses.newThisWeek}
            description="This Week"
            className="bg-yellow-100"
            borderColor="border-yellow-500"
          />
        </>
      )}
    </motion.div>
  )
}

export default StatsCard
