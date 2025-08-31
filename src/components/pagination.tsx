'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { generatePagination } from '@/lib/utils'
import { motion } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'

const PaginationTemplate = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || 1)

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Pagination>
        <PaginationContent className="rounded-xl border bg-card p-2 shadow-md dark:bg-neutral-900">
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {allPages.map((page, i) => (
            <PaginationItem key={i}>
              {page === '...' ? (
                <span className="px-3 py-1">...</span>
              ) : (
                <PaginationLink href={createPageURL(page)} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  )
}

export default PaginationTemplate
