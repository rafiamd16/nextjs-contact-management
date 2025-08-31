'use client'

import React from 'react'

const DataContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="card-hover rounded-xl border bg-card p-5 shadow-md dark:bg-neutral-900">
      {children}
    </div>
  )
}

export default DataContainer
