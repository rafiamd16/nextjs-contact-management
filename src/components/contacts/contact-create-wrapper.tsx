'use client'

import Back from '@/components/back'
import ContactForm from '@/components/contacts/contact-form'
import Header from '@/components/header'
import { motion } from 'framer-motion'
import { FaUserPlus } from 'react-icons/fa6'

const ContactCreateWrapper = () => {
  return (
    <>
      <Header
        title="Create New Contact"
        mode="form"
        back={<Back />}
        icon={<FaUserPlus size={32} className="text-primary" />}
      />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ContactForm
          mode="create"
          defaultValues={{ email: '', first_name: '', last_name: '', phone: '' }}
        />
      </motion.div>
    </>
  )
}

export default ContactCreateWrapper
