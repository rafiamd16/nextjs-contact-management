'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface Props {
  isOpen: boolean
  setIsOpen: () => void
}

export const HamburgerToggle = ({ isOpen, setIsOpen }: Props) => {
  return (
    <button className="relative z-50 cursor-pointer lg:hidden" onClick={setIsOpen}>
      <motion.span
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className="relative block h-5 w-6"
      >
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 9 },
          }}
          transition={{ duration: 0.3 }}
          className={cn('absolute top-0 left-0 block h-[2px] w-full rounded bg-current')}
        />

        <motion.span
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute top-1/2 left-0 block h-[2px] w-full -translate-y-1/2 rounded bg-current',
          )}
        />

        <motion.span
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -9 },
          }}
          transition={{ duration: 0.3 }}
          className={cn('absolute bottom-0 left-0 block h-[2px] w-full rounded bg-current')}
        />
      </motion.span>
    </button>
  )
}
