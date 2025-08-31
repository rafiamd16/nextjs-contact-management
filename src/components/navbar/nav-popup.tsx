'use client'

import { HamburgerToggle } from '@/components/navbar/hamburger-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IUser } from '@/types/user'
import { Contact, Home, LayoutDashboard, User2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface Props {
  user: IUser | null
}

const NavPopup = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const shouldShowAdminLinks = user?.role === 'admin'

  const links = [
    { label: 'Home', href: '/', icon: <Home className="size-4" /> },
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="size-4" /> },
    ...(shouldShowAdminLinks
      ? [
          {
            label: 'Users',
            href: '/dashboard/admin/users',
            icon: <User2 className="size-4" />,
          },
        ]
      : []),
    {
      label: 'Contacts',
      href: '/dashboard/contacts',
      icon: <Contact className="size-4" />,
    },
  ]

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <HamburgerToggle isOpen={isOpen} setIsOpen={handleToggle} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="min-w-48 lg:hidden">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link, i) => (
          <DropdownMenuItem
            asChild
            key={i}
            className={`relative cursor-pointer transition-all duration-300 after:absolute after:top-1/2 after:right-2 after:h-[2px] after:w-5 after:origin-center after:-translate-y-1/2 after:scale-x-0 after:rotate-90 after:rounded after:bg-primary after:transition-transform after:duration-300 ${
              pathname === link.href
                ? 'font-bold text-primary after:scale-x-100'
                : 'hover:text-primary hover:after:scale-x-100'
            } `}
          >
            <Link
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2"
            >
              {link.icon}
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavPopup
