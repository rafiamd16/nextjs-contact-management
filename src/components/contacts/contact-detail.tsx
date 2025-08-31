import AddressList from '@/components/address/address-list'
import { BackFormButton } from '@/components/buttons'
import ContactDetailContainer from '@/components/contacts/contact-detail-container'
import ContactDetailData from '@/components/contacts/contact-detail-data'
import { Button } from '@/components/ui/button'
import { getAddress } from '@/lib/actions/address-action'
import { Contact } from '@/types/contact'
import Link from 'next/link'
import { FaMapMarkerAlt, FaUserEdit } from 'react-icons/fa'
import { FaPlus, FaUser } from 'react-icons/fa6'

const ContactDetail = async ({ contact }: { contact: Contact }) => {
  const addresses = await getAddress(contact.id as string)

  return (
    <ContactDetailContainer>
      <div className="p-8">
        <div className="mb-8 text-center">
          <div className="bg-gradient mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
            <FaUser size={32} className="text-white" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">
            {contact.first_name} {contact.last_name}
          </h2>
          <div className="bg-gradient mx-auto h-1 w-24 rounded-full" />
        </div>

        <ContactDetailData contact={contact} />

        <div className="mb-8">
          <div className="mb-5 flex items-center">
            <FaMapMarkerAlt className="mr-3 text-primary" />
            <h3 className="text-xl font-semibold">Addresses</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-lg border-2 border-dashed p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-neutral-800">
              <Link
                href={`/dashboard/contacts/${contact.id}/addresses/create`}
                className="block h-full"
              >
                <div className="flex h-full flex-col items-center justify-center py-4 text-center">
                  <div className="bg-gradient mb-4 flex h-16 w-16 transform items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
                    <FaPlus className="text-2xl text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Add Address</h4>
                </div>
              </Link>
            </div>
            <AddressList contactId={contact.id} addresses={addresses} />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <BackFormButton />
          <Button className="bg-gradient h-12 transform cursor-pointer shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <Link
              href={`/dashboard/contacts/${contact.id}/edit`}
              className="flex items-center text-white"
            >
              <FaUserEdit className="mr-2" /> Edit Contact
            </Link>
          </Button>
        </div>
      </div>
    </ContactDetailContainer>
  )
}

export default ContactDetail
