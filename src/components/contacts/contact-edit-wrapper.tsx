'use client'

import Back from '@/components/back'
import ContactForm from '@/components/contacts/contact-form'
import Header from '@/components/header'
import { ContactFormSchema } from '@/lib/validations/contact-validation'
import { motion } from 'framer-motion'
import { FaUserEdit } from 'react-icons/fa'

interface Props {
  defaultValues?: ContactFormSchema
  contactId: string
}

const ContactEditWrapper = ({ contactId, defaultValues }: Props) => {
  return (
    <>
      <Header
        title="Edit Contact"
        mode="form"
        back={<Back />}
        icon={<FaUserEdit size={32} className="text-primary" />}
      />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ContactForm mode="edit" contactId={contactId} defaultValues={defaultValues} />
      </motion.div>
    </>
  )
}

export default ContactEditWrapper
