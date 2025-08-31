import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserDashboard } from '@/types/dashboard'
import { FaUser } from 'react-icons/fa6'

interface Props {
  recentContacts: UserDashboard
}

const UserTableDashboard = ({ recentContacts }: Props) => {
  return (
    <Table>
      <TableCaption>A list of your recent contact.</TableCaption>
      <TableHeader>
        <TableRow className="uppercase">
          <TableHead className="font-bold">Name</TableHead>
          <TableHead className="font-bold">Email</TableHead>
          <TableHead className="font-bold">Phone</TableHead>
          <TableHead className="font-bold">Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentContacts.contacts.total === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="py-6 text-center">
              No contact found
            </TableCell>
          </TableRow>
        )}
        {recentContacts.contacts.recentContacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell className="flex w-40 items-center gap-3">
              <div className="rounded-full bg-primary p-2">
                <FaUser className="text-white" />
              </div>
              {contact.first_name} {contact.last_name}
            </TableCell>
            <TableCell>{contact.email}</TableCell>
            <TableCell>{contact.phone}</TableCell>
            <TableCell>{contact.addresses?.map((address) => address.city).join(', ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserTableDashboard
