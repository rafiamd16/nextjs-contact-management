import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

interface Props {
  avatarUrl: string | null | undefined
  size?: number
  className?: string
  isOpen: boolean
  setIsOpen: () => void
}

const UserAvatar = ({ avatarUrl, size, className, isOpen, setIsOpen }: Props) => {
  return (
    <div onClick={setIsOpen} className="flex items-center gap-1">
      <Image
        src={avatarUrl ?? '/img/avatar-placeholder.png'}
        alt="avatar"
        width={size ?? 48}
        height={size ?? 48}
        priority
        className={cn(
          'aspect-square h-fit flex-none rounded-full bg-secondary object-cover select-none',
          className,
        )}
      />
      <ChevronDown
        className={`size-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'} `}
      />
    </div>
  )
}

export default UserAvatar
