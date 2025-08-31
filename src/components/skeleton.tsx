import { Skeleton } from '@/components/ui/skeleton'

const ContactSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i: number) => (
        <Skeleton key={i} className="min-h-80 rounded-xl p-9" />
      ))}
    </>
  )
}

export default ContactSkeleton
