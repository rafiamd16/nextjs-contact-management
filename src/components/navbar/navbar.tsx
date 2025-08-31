'use client'

import NavPopup from '@/components/navbar/nav-popup'
import UserButton from '@/components/user-profile/user-button'
import { IUser } from '@/types/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAddressBook } from 'react-icons/fa6'

interface Props {
  user: IUser | null
  isLoggedIn: boolean
}

const Navbar = ({ isLoggedIn, user }: Props) => {
  const [isScroll, setIsScroll] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  const shouldShowAdminLinks = isLoggedIn && user?.role === 'admin'

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    ...(shouldShowAdminLinks ? [{ label: 'Users', href: '/dashboard/admin/users' }] : []),
    {
      label: 'Contacts',
      href: '/dashboard/contacts',
    },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 50) setIsScroll(true)
      else setIsScroll(false)
    })
  }, [])

  if (!isMounted) return null

  return (
    <header className="relative w-full">
      <div
        className={`fixed top-0 left-0 z-50 w-full py-3 ${
          isScroll ? 'bg-card/50 shadow-sm shadow-foreground/10 backdrop-blur-lg' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 text-xl font-bold text-foreground">
                <FaAddressBook className="size-6 text-primary" />
                <span className="hidden capitalize lg:block">contact management</span>
              </Link>

              <div className="flex items-center lg:hidden">
                <UserButton user={user} isLoggedIn={isLoggedIn} />
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <nav
                className={`hidden rounded-full px-6 py-3 lg:block ${
                  isScroll ? 'shadow-none' : 'shadow dark:shadow-foreground/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`relative transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-1/2 after:origin-center after:-translate-x-1/2 after:scale-x-0 after:rounded after:bg-primary after:transition-transform after:duration-300 ${
                        pathname === link.href
                          ? `-translate-y-0.5 font-semibold text-primary after:scale-x-100`
                          : 'hover:-translate-y-0.5 hover:text-primary hover:after:scale-x-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="hidden items-center lg:flex">
                <UserButton isLoggedIn={isLoggedIn} user={user} />
              </div>
              <NavPopup user={user} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
