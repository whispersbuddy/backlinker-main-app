import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { db, decrypt } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "bio",
    header: "Bio",
  },
  {
    accessorKey: "stripePriceId",
    header: "Stripe Price ID",
  },
]

export default async function AdminPage() {
  const users = await db.user.findMany()

  return (
    <DashboardShell>
      <DashboardHeader heading="Admin" text="Manage users." />
      <div className="flex flex-col max-w-full gap-10">
        <DataTable columns={columns} data={users} />
      </div>
    </DashboardShell>
  )
}
