'use client'

import { DeleteButton } from '@/components/buttons'
import { Button } from '@/components/ui/button'
import { deleteAddressById } from '@/lib/actions/address-action'
import { Address } from '@/types/address'
import Link from 'next/link'
import { FaEdit, FaHome, FaMailBulk } from 'react-icons/fa'
import { FaCity, FaFlag, FaMap, FaRoad } from 'react-icons/fa6'

interface Props {
  contactId: string | null | undefined
  addresses: Address[]
}

const AddressList = ({ contactId, addresses }: Props) => {
  const handleDelete = async ({
    contactId,
    addressId,
  }: {
    contactId: string
    addressId: string
  }) => {
    await deleteAddressById(contactId, addressId)
  }

  return (
    <>
      {addresses.map((address) => {
        const addressData = [
          {
            icon: <FaRoad className="w-6 text-neutral-500" />,
            label: 'Street',
            value: address.street,
          },
          {
            icon: <FaCity className="w-6 text-neutral-500" />,
            label: 'City',
            value: address.city,
          },
          {
            icon: <FaMap className="w-6 text-neutral-500" />,
            label: 'Province',
            value: address.province,
          },
          {
            icon: <FaFlag className="w-6 text-neutral-500" />,
            label: 'Country',
            value: address.country,
          },
          {
            icon: <FaMailBulk className="w-6 text-neutral-500" />,
            label: 'Postal Code',
            value: address.postal_code,
          },
        ]

        return (
          <div
            key={address.id}
            className="card-hover rounded-xl border bg-card p-5 shadow-md dark:bg-neutral-800"
          >
            <div className="mb-3 flex items-center">
              <div className="mr-3 flex items-center justify-center rounded-full bg-blue-500 p-2 shadow-md">
                <FaHome className="size-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Home Address</h4>
            </div>
            <div className="mb-4 ml-1 space-y-3">
              {addressData.map((item, i) => (
                <p key={i} className="flex items-center">
                  {item.icon}
                  <span className="w-30 font-medium">{item.label}:</span>
                  <span>{item.value}</span>
                </p>
              ))}
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                size="sm"
                className="bg-gradient h-9 transform cursor-pointer shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <Link
                  href={`/dashboard/contacts/${contactId}/addresses/${address.id}/edit`}
                  className="flex items-center text-white"
                >
                  <FaEdit className="mr-2" /> Edit
                </Link>
              </Button>
              <DeleteButton
                id={{ contactId: contactId!, addressId: address.id }}
                onDelete={handleDelete}
                description="Address"
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default AddressList
