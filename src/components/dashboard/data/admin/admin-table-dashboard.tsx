import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { AdminDashboard } from '@/types/dashboard'
import Image from 'next/image'

interface Props {
  data: AdminDashboard
}

const AdminTableDashboard = ({ data }: Props) => {
  return (
    <Table>
      <TableCaption>A list of your recent user.</TableCaption>
      <TableHeader>
        <TableRow className="uppercase">
          <TableHead className="font-bold">User</TableHead>
          <TableHead className="font-bold">Email</TableHead>
          <TableHead className="font-bold">Role</TableHead>
          <TableHead className="font-bold">Contacts</TableHead>
          <TableHead className="font-bold">Last Login</TableHead>
          <TableHead className="font-bold">Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.users.total === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="py-6 text-center">
              No user found
            </TableCell>
          </TableRow>
        )}
        {data.users.all.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="flex w-40 items-center gap-3">
              <Image
                src={user.image ?? '/img/avatar-placeholder.png'}
                alt="avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
              {user.name}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <span
                className={`rounded-full px-2 text-xs leading-5 font-semibold capitalize ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}
              >
                {user.role}
              </span>
            </TableCell>
            <TableCell>{user._count.contacts}</TableCell>
            <TableCell>{formatDate(user.lastLogin)}</TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AdminTableDashboard
