'use client'

import AdminRecentUsers from '@/components/dashboard/data/admin/recent-users'
import Data from '@/components/dashboard/data/data'
import Profile from '@/components/dashboard/profile'
import StatsCard from '@/components/dashboard/stats-card/stats-card'
import { AdminDashboard, UserDashboard } from '@/types/dashboard'
import { IUser } from '@/types/user'

interface Props {
  user: IUser
  userStats: UserDashboard
  adminStats: AdminDashboard
  data: AdminDashboard
  recentUsers: AdminDashboard
  recentContactsUser: UserDashboard
}

const DashboardWrapper = ({
  user,
  userStats,
  adminStats,
  data,
  recentContactsUser,
  recentUsers,
}: Props) => {
  return (
    <div className="space-y-8">
      <Profile user={user as IUser} />
      <StatsCard user={user} userStats={userStats} adminStats={adminStats} />
      <Data recentContactsUser={recentContactsUser} data={data} user={user} />
      {user?.role === 'admin' && <AdminRecentUsers recentUsers={recentUsers} />}
    </div>
  )
}

export default DashboardWrapper
