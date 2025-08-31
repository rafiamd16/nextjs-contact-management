'use client'

import { motion } from 'framer-motion'

const ContactDetailContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl overflow-hidden rounded-xl border bg-card text-card-foreground shadow-md"
    >
      {children}
    </motion.div>
  )
}

export default ContactDetailContainer
