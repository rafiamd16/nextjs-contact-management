import AddressForm from '@/components/address/address-form'
import Back from '@/components/back'
import Header from '@/components/header'
import { getAddressById } from '@/lib/actions/address-action'
import { getContactById } from '@/lib/actions/contact-action'
import { AddressFormSchema } from '@/lib/validations/address-validation'
import { Metadata } from 'next'
import { FaMapMarkerAlt } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Edit Address',
}

const AddressEditPage = async ({
  params,
}: {
  params: Promise<{ contactId: string; addressId: string }>
}) => {
  const { contactId, addressId } = await params
  const address = await getAddressById(contactId, addressId)
  const contact = await getContactById(contactId)

  return (
    <section className="pt-22 sm:pt-24">
      <Header
        icon={<FaMapMarkerAlt size={32} className="text-primary" />}
        title="Edit Address"
        mode="form"
        back={<Back />}
      />
      <AddressForm
        contact={contact}
        mode="edit"
        contactId={contactId}
        addressId={addressId}
        defaultValues={address as AddressFormSchema}
      />
    </section>
  )
}

export default AddressEditPage
