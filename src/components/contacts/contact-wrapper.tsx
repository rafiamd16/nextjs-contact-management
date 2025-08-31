'use client'

import ContactList from '@/components/contacts/contact-list'
import { Filtered } from '@/components/filtered'
import Header from '@/components/header'
import PaginationTemplate from '@/components/pagination'
import Index from '@/components/search'
import { useContacts } from '@/hooks/useContacts'
import { deleteAllContacts } from '@/lib/actions/contact-action'
import { Contact } from '@/types/contact'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { FaUsers } from 'react-icons/fa6'

const ContactWrapper = ({ role }: { role: string }) => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const query = searchParams.get('query') || ''
  const filter = searchParams.get('filter') || ''
  let page = searchParams.get('page') || '1'

  useEffect(() => {
    const pageNum = parseInt(page, 10)
    if (isNaN(pageNum) || pageNum < 1) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', '1')
      replace(`${pathname}?${params.toString()}`)
    }
  }, [page, pathname, replace, searchParams])

  const params = useMemo(
    () => ({
      query,
      filter,
      page,
    }),
    [query, filter, page],
  )

  const { contacts, pagination, isLoading, mutate } = useContacts(params)
  const data: Contact[] = contacts

  useEffect(() => {
    if (!pagination || !pagination.totalPages) return

    const pageNum = parseInt(page, 10)
    if (pageNum > pagination.totalPages) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(pagination.totalPages))
      replace(`${pathname}?${params.toString()}`)
    }
  }, [page, pagination, pathname, replace, searchParams])

  return (
    <>
      <Header
        title="My Contacts"
        icon={<FaUsers size={32} className="text-primary" />}
        mode="default"
      />

      <motion.div
        className={role === 'admin' ? 'mb-4' : 'mb-8'}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Index data={data} mutate={mutate} onDelete={deleteAllContacts} description="contacts" />
      </motion.div>

      {role === 'admin' && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-end gap-3"
        >
          <Filtered />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {data.length === 0 && !isLoading && (
          <p className="mb-8 text-center text-2xl font-medium">You have no contacts.</p>
        )}
        <ContactList role={role} data={data} isLoading={isLoading} mutate={mutate} />
      </motion.div>

      <div className="mt-10 flex justify-center">
        <PaginationTemplate totalPages={pagination?.totalPages ?? 1} />
      </div>
    </>
  )
}

export default ContactWrapper
