'use client'

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  placeholder?: string
}

const SearchInput = ({ placeholder = 'Search by name or email...' }: Props) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { push } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    push(`${pathname}?${params.toString()}`)
  }, 500)

  return (
    <div className="relative flex w-full">
      <Input
        type="search"
        name="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString() ?? ''}
        className="h-12 pl-9 placeholder:text-xs sm:placeholder:text-sm"
      />
      <FaSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
    </div>
  )
}

export default SearchInput
