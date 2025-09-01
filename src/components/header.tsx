'use client'

import { motion } from 'framer-motion'

interface Props {
  title: string
  icon: React.ReactNode
  back?: React.ReactNode
  mode: 'default' | 'form'
}

const Header = ({ icon, back, title, mode = 'default' }: Props) => {
  return mode === 'default' ? (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex items-center gap-3"
    >
      <span className="shrink-0">{icon}</span>
      <h1 className="text-2xl font-bold capitalize">{title}</h1>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex items-center gap-4"
    >
      {back}
      <div className="flex items-center gap-3">
        <span className="shrink-0">{icon}</span>
        <h1 className="text-lg font-bold capitalize sm:text-2xl">{title}</h1>
      </div>
    </motion.div>
  )
}

export default Header
