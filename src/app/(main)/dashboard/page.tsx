import DashboardWrapper from '@/components/dashboard/dashboard-wrapper'
import Header from '@/components/header'
import { getDashboardStats } from '@/lib/actions/dashboard-action'
import { getCurrentUser } from '@/lib/actions/user-action'
import { AdminDashboard, UserDashboard } from '@/types/dashboard'
import { IUser } from '@/types/user'
import { LayoutDashboard } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export const dynamic = 'force-dynamic'

const DashboardPage = async () => {
  try {
    const user = (await getCurrentUser()) as IUser
    const userStats = (await getDashboardStats()) as UserDashboard
    const AdminStats = (await getDashboardStats()) as unknown as AdminDashboard
    const data = (await getDashboardStats()) as unknown as AdminDashboard
    const recentContacts = (await getDashboardStats()) as UserDashboard
    const recentUsers = (await getDashboardStats()) as unknown as AdminDashboard

    return (
      <section className="pt-22 sm:pt-24">
        <Header
          title={user?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
          mode="default"
          icon={<LayoutDashboard size={32} className="text-primary" />}
        />
        <DashboardWrapper
          recentUsers={recentUsers}
          recentContacts={recentContacts}
          data={data}
          userStats={userStats}
          adminStats={AdminStats}
          user={user}
        />
      </section>
    )
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw new Error('Failed to fetch dashboard statistics')
  }
}

export default DashboardPage
