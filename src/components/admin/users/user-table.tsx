import UserSkeleton from '@/components/admin/users/skeleton'
import { DeleteButton } from '@/components/buttons'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteUserById } from '@/lib/actions/user-action'
import { formatDate } from '@/lib/utils'
import { User } from '@prisma/client'

interface Props {
  users: User[]
  isLoading: boolean
  mutate: () => void
}

const UserTable = ({ users, isLoading, mutate }: Props) => {
  if (isLoading) return <UserSkeleton />

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
            <TableHead className="font-bold">Created At</TableHead>
            <TableHead className="text-center font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-6 text-center">
                No contact found
              </TableCell>
            </TableRow>
          )}
          {users.map((user, i: number) => (
            <TableRow key={user.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell className="flex items-center justify-center">
                <DeleteButton onDelete={deleteUserById} id={user.id} mutate={mutate} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserTable
