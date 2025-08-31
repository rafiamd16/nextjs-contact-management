import UserWrapper from '@/components/user-wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users',
}

const AdminUserPage = () => {
  return (
    <section className="pt-22 sm:pt-24">
      <UserWrapper />
    </section>
  )
}

export default AdminUserPage
