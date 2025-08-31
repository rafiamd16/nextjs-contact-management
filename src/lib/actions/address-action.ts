'use server'

import { auth } from '@/auth'
import { getContactById } from '@/lib/actions/contact-action'
import { prisma } from '@/lib/prisma'
import {
  addressFormSchema,
  AddressFormSchema,
  addressUpdateFormSchema,
  AddressUpdateFormSchema,
} from '@/lib/validations/address-validation'
import { Address } from '@/types/address'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getAddress = async (contactId: string): Promise<Address[]> => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  try {
    await getContactById(contactId)

    return await prisma.address.findMany({
      where: { contactId },
    })
  } catch (error) {
    return []
  }
}

export const createAddress = async (contactId: string, data: AddressFormSchema) => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  const parsed = addressFormSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  try {
    await getContactById(contactId)

    const newAddress = await prisma.address.create({
      data: { ...parsed.data, contactId },
    })
    revalidatePath(`/dashboard/contacts/${contactId}`)
    return newAddress
  } catch (error) {
    return { error: 'Failed to create address' }
  }
}

export const getAddressById = async (contactId: string, addressId: string) => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  await getContactById(contactId)

  const address = await prisma.address.findUnique({
    where: { id: addressId },
  })
  if (!address) throw new Error('Address not found')

  return address
}

export const updateAddress = async (
  contactId: string,
  addressId: string,
  data: AddressUpdateFormSchema,
) => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  const parsed = addressUpdateFormSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  await getAddressById(contactId, addressId)

  try {
    const updateAddress = await prisma.address.update({
      where: { id: addressId },
      data: parsed.data,
    })
    revalidatePath(`/dashboard/contacts/${contactId}`)
    return updateAddress
  } catch (error) {
    return { error: 'Failed to update address' }
  }
}

export const deleteAddressById = async (contactId: string, addressId: string) => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  await getAddressById(contactId, addressId)

  try {
    await prisma.address.delete({ where: { id: addressId } })
    revalidatePath(`/dashboard/contacts/${contactId}`)
    return { message: 'Address deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete address' }
  }
}
