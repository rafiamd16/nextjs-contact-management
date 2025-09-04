import Footer from '@/components/footer'
import Navbar from '@/components/navbar/navbar'
import { getCurrentUser } from '@/lib/actions/user-action'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()
  const isLoggedIn = !!user

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-neutral-50 to-blue-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <div className="container mx-auto min-h-screen px-4">{children}</div>
      <Footer />
    </div>
  )
}

export default DashboardLayout
