'use client'

import { Contact } from '@/types/contact'
import { FaEnvelope, FaPhone, FaUserTag } from 'react-icons/fa6'

interface Props {
  contact: Contact
}

const ContactDetailData = ({ contact }: Props) => {
  const contactData1 = [
    {
      icon: <FaUserTag className="mr-2 text-primary" />,
      label: 'First Name',
      value: contact.first_name,
    },
    {
      icon: <FaUserTag className="mr-2 text-primary" />,
      label: 'Last Name',
      value: contact.last_name === '' ? '-' : contact.last_name,
    },
  ]

  const contactData2 = [
    {
      icon: <FaEnvelope className="mr-2 text-primary" />,
      label: 'Email',
      value: contact.email === '' ? '-' : contact.email,
    },
    {
      icon: <FaPhone className="mr-2 text-primary" />,
      label: 'Phone',
      value: contact.phone,
    },
  ]

  return (
    <div className="mb-8 space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {contactData1.map((item, i) => (
          <div
            key={i}
            className="overflow-x-hidden rounded-lg border p-5 shadow-md transition-all duration-200 hover:opacity-70 dark:bg-neutral-800"
          >
            <div className="mb-2 flex items-center">
              <span className="shrink-0">{item.icon}</span>
              <h3 className="overflow-auto text-sm font-medium">{item.label}</h3>
            </div>
            <p className="ml-6 overflow-auto text-lg">{item.value}</p>
          </div>
        ))}
      </div>

      {contactData2.map((item, i) => (
        <div
          key={i}
          className="overflow-x-hidden rounded-lg border p-5 shadow-md transition-all duration-200 hover:opacity-70 dark:bg-neutral-800"
        >
          <div className="mb-2 flex items-center">
            <span className="shrink-0">{item.icon}</span>
            <h3 className="overflow-auto text-sm font-medium">{item.label}</h3>
          </div>
          <p className="ml-6 overflow-auto text-lg">{item.value}</p>
        </div>
      ))}
    </div>
  )
}

export default ContactDetailData
