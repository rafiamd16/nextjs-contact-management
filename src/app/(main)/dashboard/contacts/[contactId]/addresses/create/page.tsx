import Addressform from '@/components/address/address-form'
import Back from '@/components/back'
import Header from '@/components/header'
import { getContactById } from '@/lib/actions/contact-action'
import { Metadata } from 'next'
import { FaPlusCircle } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Add New Address',
}

const AddressesCreatePage = async ({ params }: { params: Promise<{ contactId: string }> }) => {
  const { contactId } = await params
  const contact = await getContactById(contactId)

  return (
    <section className="pt-22 sm:pt-24">
      <Header
        mode="form"
        title="Add New Address"
        icon={<FaPlusCircle size={32} className="text-primary" />}
        back={<Back />}
      />
      <Addressform
        contact={contact}
        mode="create"
        contactId={contactId}
        defaultValues={{ country: '', postal_code: '', street: '', city: '', province: '' }}
      />
    </section>
  )
}

export default AddressesCreatePage
