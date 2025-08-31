'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { contactFormSchema, contactUpdateFormSchema } from '@/lib/validations/contact-validation'
import { Contact } from '@/types/contact'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getContactById = async (contactId: string): Promise<Contact> => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  const where =
    session.user.role === 'admin' ? { id: contactId } : { id: contactId, userId: session.user.id }

  try {
    const contact = await prisma.contact.findFirst({
      where,
      include:
        session.user.role === 'admin'
          ? {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            }
          : undefined,
    })
    if (!contact) throw new Error('Contact not found')

    return contact
  } catch (error) {
    throw new Error('Failed to get contact')
  }
}

export const createContact = async (data: Omit<Contact, 'id'>) => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  const parsed = contactFormSchema.safeParse(data)
  if (!parsed.success) throw new Error(parsed.error.issues[0].message)

  try {
    const newContact = await prisma.contact.create({
      data: { ...parsed.data, userId: session.user.id as string },
    })

    revalidatePath('/dashboard/contacts')
    return newContact
  } catch (error) {
    return { error: 'Failed to create contact' }
  }
}

export const updateContact = async (contactId: string, data: Partial<Omit<Contact, 'id'>>) => {
  const parsed = contactUpdateFormSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  await getContactById(contactId)

  try {
    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: parsed.data,
    })

    revalidatePath('/dashboard/contacts')
    return updatedContact
  } catch (error) {
    throw new Error('Failed to update contact')
  }
}

export const deleteContactById = async (contactId: string) => {
  await getContactById(contactId)

  try {
    await prisma.contact.delete({
      where: { id: contactId },
    })
    revalidatePath('/dashboard/contacts')
    return { message: 'Contact deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete contact' }
  }
}

export const deleteAllContacts = async () => {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    redirect('/login')
  }

  const where = session.user.role === 'admin' ? {} : { userId: session.user.id }

  try {
    await prisma.contact.deleteMany({ where })
    revalidatePath('/dashboard/contacts')
    return { message: 'All contacts deleted successfully' }
  } catch (error) {
    return { error: 'Failed to delete contacts' }
  }
}
