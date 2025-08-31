import { DeleteAllButton } from '@/components/buttons'
import SearchInput from '@/components/search/search-input'
import { FaSearch } from 'react-icons/fa'

interface Props {
  data: Object[]
  mutate: () => void
  onDelete: () => Promise<unknown>
  description?: string
}

const Index = ({ data, mutate, onDelete, description }: Props) => {
  return (
    <div className="card-hover flex flex-col justify-center rounded-xl border bg-card p-6 shadow-md dark:bg-neutral-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaSearch className="text-blue-400" />
          <h2 className="text-base font-semibold sm:text-xl">Search Contacts</h2>
        </div>
        <DeleteAllButton
          data={data}
          onDelete={onDelete}
          description={description}
          mutate={mutate}
        />
      </div>
      <SearchInput placeholder="Search by name, email or phone..." />
    </div>
  )
}

export default Index
