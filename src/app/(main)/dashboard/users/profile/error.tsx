'use client'

const Error = ({ error }: { error: Error }) => {
  return (
    <section className="pt-22 sm:pt-24">
      <div className="text-red-500">Error: {error.message}</div>
    </section>
  )
}

export default Error
