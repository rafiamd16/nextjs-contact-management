'use client'

import Header from '@/components/header'
import ChangePasswordForm from '@/components/profile/change-password-form'
import ProfileForm from '@/components/profile/profile-form'
import { IUser } from '@/types/user'
import { motion } from 'framer-motion'
import { FaUserCog } from 'react-icons/fa'

const ProfileWrapper = ({ user }: { user: IUser }) => {
  return (
    <>
      <Header
        title="My Profile"
        mode="default"
        icon={<FaUserCog size={32} className="text-primary" />}
      />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <ProfileForm user={user} />
        <ChangePasswordForm />
      </motion.div>
    </>
  )
}

export default ProfileWrapper
