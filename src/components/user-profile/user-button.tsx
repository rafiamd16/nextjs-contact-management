'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from '@/components/user-profile/user-avatar'
import { signOutCredentials } from '@/lib/actions/user-action'
import { cn } from '@/lib/utils'
import { IUser } from '@/types/user'
import { Check, LogIn, LogOut, Monitor, Moon, Sun, UserCircle, UserIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  user: IUser | null
  className?: string
  isLoggedIn: boolean
}

const UserButton = ({ className, user, isLoggedIn }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.email || '')
    setIsOpen(false)
    toast.success('Copied to clipboard', { richColors: true, position: 'top-center' })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex-none cursor-pointer rounded-full focus:ring-0 focus:outline-none',
            className,
          )}
        >
          <UserAvatar
            isOpen={isOpen}
            setIsOpen={handleToggle}
            avatarUrl={user?.image ?? '/img/avatar-placeholder.png'}
            className="size-8 lg:size-10"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuLabel>
          {isLoggedIn ? (
            <span>
              Signed in as <span className="font-semibold">{user?.name}</span>
            </span>
          ) : (
            <span className="text-xs font-semibold">Not signed in</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoggedIn && (
          <DropdownMenuItem onClick={handleCopy} className="text-neutral-400">
            <UserCircle className="size-4" />
            {user?.email}
          </DropdownMenuItem>
        )}
        <Link href="/dashboard/users/profile">
          <DropdownMenuItem
            className={`relative cursor-pointer transition-all duration-300 after:absolute after:top-1/2 after:right-2 after:h-[2px] after:w-5 after:origin-center after:-translate-y-1/2 after:scale-x-0 after:rotate-90 after:rounded after:bg-primary after:transition-transform after:duration-300 ${
              pathname === '/dashboard/users/profile'
                ? 'font-bold text-primary after:scale-x-100'
                : 'hover:text-primary hover:after:scale-x-100'
            } `}
          >
            <UserIcon className="size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('light')}>
                <Sun className="size-4" />
                Light
                {theme === 'light' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('dark')}>
                <Moon className="size-4" />
                Dark
                {theme === 'dark' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('system')}>
                <Monitor className="size-4" />
                System
                {theme === 'system' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <form action={signOutCredentials}>
          <DropdownMenuItem
            asChild
            className={`cursor-pointer font-semibold ${
              isLoggedIn ? 'text-destructive' : 'text-primary'
            }`}
          >
            {isLoggedIn ? (
              <button type="submit" className="flex w-full items-center gap-2">
                <LogOut className="size-4" />
                Signout
              </button>
            ) : (
              <Link href="/login">
                <LogIn className="size-4" />
                Signin
              </Link>
            )}
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
