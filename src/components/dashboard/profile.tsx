'use client'

import { IUser } from '@/types/user'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  user: IUser
}

const Profile = ({ user }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="card-hover flex items-center justify-between gap-4 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-10 shadow-md md:p-10">
        <div className="space-y-2 text-white">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome, {user?.name}!</h1>
          <p className="text-base">Manage your contacts easily and efficiently</p>
        </div>
        <div className="hidden items-center justify-center md:flex">
          <Image
            src={user?.image ?? '/img/avatar-placeholder.png'}
            alt="avatar"
            width={90}
            height={90}
            className="max-w-full rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
