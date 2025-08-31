import ProfileWrapper from '@/components/profile/profile-wrapper'
import { getCurrentUser } from '@/lib/actions/user-action'
import { IUser } from '@/types/user'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
}

const ProfilePage = async () => {
  const user = await getCurrentUser()

  if ('error' in user!) return { error: user.error }

  return (
    <section className="pt-22 sm:pt-24">
      <ProfileWrapper user={user as IUser} />
    </section>
  )
}

export default ProfilePage
