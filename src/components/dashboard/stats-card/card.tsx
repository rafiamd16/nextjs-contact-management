interface Props {
  label: string
  value: number
  icon: React.ReactNode
  description?: string
  className?: string
  borderColor?: string
}

const Card = ({ label, value, icon, description, className, borderColor }: Props) => {
  return (
    <div
      className={`card-hover overflow-hidden rounded-lg border-l-4 bg-card shadow-md dark:bg-neutral-900 ${borderColor}`}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md ${className} p-3`}>{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-neutral-500">{label}</dt>
              <dd className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                {value}
              </dd>
              {description && <p className={`text-sm text-neutral-500`}>{description}</p>}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
