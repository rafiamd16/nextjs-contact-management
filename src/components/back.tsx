'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { IoArrowBack } from 'react-icons/io5'

const Back = () => {
  const { back } = useRouter()

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => back()}
      className="flex w-max cursor-pointer items-center justify-center gap-1 py-1 transition hover:text-blue-400"
    >
      <IoArrowBack size={20} /> <span className="text-sm font-semibold">back</span>
    </Button>
  )
}

export default Back
