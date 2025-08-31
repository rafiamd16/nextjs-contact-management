import ContactCreateWrapper from '@/components/contacts/contact-create-wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create New Contact',
}

const ContactCreatePage = () => {
  return (
    <section className="pt-22 sm:pt-24">
      <ContactCreateWrapper />
    </section>
  )
}

export default ContactCreatePage
