'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const Filtered = () => {
  const [isOpen, setIsOpen] = useState(false)

  const searchParams = useSearchParams()
  const { push } = useRouter()

  const currentFilter = searchParams.get('filter') === 'mine' ? 'My contacts' : 'All contacts'
  const [position, setPosition] = useState(currentFilter)

  const handleChange = (value: string) => {
    setPosition(value)
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', '1')
    if (value === 'My contacts') {
      params.set('filter', 'mine')
    } else {
      params.delete('filter')
    }
    push(`?${params.toString()}`)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center">
          Filtered by: <span className="font-bold text-blue-400">{position}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
          <DropdownMenuRadioItem value="All contacts">All contacts</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="My contacts">My contacts</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
