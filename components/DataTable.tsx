import React from 'react'
import { UserNav } from './ui/UserNav'
import { DataTable } from './ui/data-table'

type DataTableProps = {
    name: string
    data: any[]
    columns: any[]
}

export default function DataTableCard({ name, data, columns }: DataTableProps) {
  return (
    <>
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
          <p className="text-muted-foreground">
            Here you can manage all the {name.toLowerCase()} in your system.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  </>
  )
}