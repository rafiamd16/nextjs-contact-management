import Link from 'next/link'
import { FaGear } from 'react-icons/fa6'

interface Props {
  title: string
  description: string
  mode?: 'action'
  href?: string
  btnText?: string
}

const Header = ({ title, description, mode, href, btnText }: Props) => {
  return (
    <div className="mb-6 flex flex-wrap justify-between gap-4 sm:items-center">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xs text-neutral-500 sm:text-sm">{description}</p>
      </div>
      {mode === 'action' && (
        <Link href={href ?? ''} className="flex items-center gap-2 text-xs sm:text-sm">
          <FaGear className="text-primary" />
          <span className="font-semibold text-primary">{btnText}</span>
        </Link>
      )}
    </div>
  )
}

export default Header
