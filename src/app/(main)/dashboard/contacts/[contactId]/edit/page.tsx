import ContactEditWrapper from '@/components/contacts/contact-edit-wrapper'
import { getContactById } from '@/lib/actions/contact-action'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Contact',
}

const ContactEditPage = async ({ params }: { params: Promise<{ contactId: string }> }) => {
  const { contactId } = await params
  const contact = await getContactById(contactId)

  return (
    <section className="pt-22 sm:pt-24">
      <ContactEditWrapper
        contactId={contactId}
        defaultValues={{
          first_name: contact.first_name ?? '',
          last_name: contact.last_name ?? '',
          email: contact.email ?? '',
          phone: contact.phone ?? '',
        }}
      />
    </section>
  )
}

export default ContactEditPage
