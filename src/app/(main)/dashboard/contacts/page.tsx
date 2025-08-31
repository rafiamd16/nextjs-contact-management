import ContactWrapper from '@/components/contacts/contact-wrapper'
import { getCurrentUser } from '@/lib/actions/user-action'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacts',
}

const ContactPage = async () => {
  const user = await getCurrentUser()

  return (
    <section className="pt-22 sm:pt-24">
      <ContactWrapper role={user?.role as string} />
    </section>
  )
}

export default ContactPage
