import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const UserSkeleton = () => {
  return (
    <div className="card-hover mx-auto max-w-screen-xl rounded-xl border bg-card p-4 shadow-md dark:bg-neutral-900">
      <Table>
        <TableCaption>A list of your recent user.</TableCaption>
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead className="font-bold">No.</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Role</TableHead>
            <TableHead className="font-bold">CreatedAt</TableHead>
            <TableHead className="text-center font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i: number) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-5 w-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell className="flex items-center justify-center gap-2">
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserSkeleton
