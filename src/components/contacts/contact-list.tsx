'use client'

import { DeleteButton } from '@/components/buttons'
import ContactSkeleton from '@/components/skeleton'
import { Button } from '@/components/ui/button'
import { deleteContactById } from '@/lib/actions/contact-action'
import { Contact } from '@/types/contact'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import { FaEnvelope, FaPhone, FaUser, FaUserPlus, FaUserTag } from 'react-icons/fa6'

interface Props {
  data: Contact[]
  isLoading: boolean
  mutate: () => void
  role: string | null
}

const ContactList = ({ data, isLoading, mutate, role }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="card-hover overflow-hidden rounded-xl border-2 border-dashed bg-card shadow-md dark:bg-neutral-900">
        <Link href="/dashboard/contacts/create" className="block h-full p-6">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="bg-gradient mb-5 flex h-20 w-20 transform items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
              <FaUserPlus size={32} className="text-white" />
            </div>
            <h2 className="mb-3 text-xl font-semibold">Create New Contact</h2>
            <p className="dark:text-neutral-300">Add a new contact to your list</p>
          </div>
        </Link>
      </div>
      {isLoading && <ContactSkeleton />}
      {data.map((contact) => {
        const contactData = [
          {
            icon: <FaUserTag className="w-6 text-neutral-500" />,
            label: 'First Name',
            value: contact.first_name,
          },
          {
            icon: <FaUserTag className="w-6 text-neutral-500" />,
            label: 'Last Name',
            value: contact.last_name,
          },
          {
            icon: <FaEnvelope className="w-6 text-neutral-500" />,
            label: 'Email',
            value: contact.email,
          },
          {
            icon: <FaPhone className="w-6 text-neutral-500" />,
            label: 'Phone',
            value: contact.phone,
          },
        ]

        return (
          <div
            key={contact.id}
            className="card-hover overflow-hidden rounded-xl border bg-card shadow-md dark:bg-neutral-900"
          >
            <div className="p-6">
              <Link
                href={`/dashboard/contacts/${contact.id}`}
                className="block cursor-pointer rounded-lg p-3 transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
                <div className="mb-3 flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 shadow-md">
                    <FaUser className="text-white" />
                  </div>
                  <h2 className="text-xl font-semibold transition-colors duration-200 hover:text-blue-400">
                    {contact.first_name} {contact.last_name}
                  </h2>
                </div>
                <div className="ml-2 space-y-3 dark:text-neutral-300">
                  {contactData.map((item, i) => (
                    <p key={i} className="flex items-center">
                      {item.icon}
                      <span className="w-24 font-medium">{item.label}:</span>
                      <span>{item.value}</span>
                    </p>
                  ))}
                </div>
              </Link>
              {role === 'admin' && <p className="mt-2 text-right text-xs">{contact.user?.name}</p>}

              {/* Actions */}
              <div className="mt-4 flex justify-end space-x-3">
                <Button
                  size="sm"
                  className="bg-gradient h-9 transform cursor-pointer shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Link
                    href={`/dashboard/contacts/${contact.id}/edit`}
                    className="flex items-center text-white"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                </Button>
                <DeleteButton
                  onDelete={deleteContactById}
                  id={contact.id}
                  description="contact"
                  mutate={mutate}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default ContactList
