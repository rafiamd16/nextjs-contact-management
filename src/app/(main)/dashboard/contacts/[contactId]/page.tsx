import Back from '@/components/back'
import ContactDetail from '@/components/contacts/contact-detail'
import Header from '@/components/header'
import { getContactById } from '@/lib/actions/contact-action'
import { Contact } from '@/types/contact'
import { Metadata } from 'next'
import { FaIdCard } from 'react-icons/fa6'

export const metadata: Metadata = {
  title: 'Contact Details',
}

const ContactDetailPage = async ({ params }: { params: Promise<{ contactId: string }> }) => {
  const { contactId } = await params
  const contact = await getContactById(contactId)

  return (
    <section className="pt-22 sm:pt-24">
      <Header
        title="Contact Details"
        mode="form"
        back={<Back />}
        icon={<FaIdCard size={32} className="text-primary" />}
      />
      <ContactDetail contact={contact as Contact} />
    </section>
  )
}

export default ContactDetailPage
