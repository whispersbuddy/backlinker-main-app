"use client"

import Link from "next/link"
import { Pitch } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Pitch>[] = [
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "body",
    header: "Content",
    cell: ({ row }) => {
      let content = row.getValue("body") as string
      if (content.length > 200) {
        content = content.substring(0, 200)
      }
      return <div>{content}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0") // JS months are 0-based
      const year = date.getFullYear()
      const hours = date.getHours().toString().padStart(2, "0")
      const minutes = date.getMinutes().toString().padStart(2, "0")
      return <div>{`${month}/${day}/${year} ${hours}:${minutes}`}</div>
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("id") as string
      return (
        <Link
          href={`/dashboard/pitch/${id}`}
          className="text-blue-500 underline hover:text-blue-600"
        >
          View Details
        </Link>
      )
    },
  },
]
