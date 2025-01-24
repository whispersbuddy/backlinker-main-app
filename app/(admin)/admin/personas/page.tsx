import { Persona, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { db } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Personas",
  description: "Manage accounts with personas.",
}

const columns: ColumnDef<Partial<Persona> & { user: User }>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user.name",
    header: "Account Name",
  },
  {
    accessorKey: "name",
    header: "Persona Name",
  },
  {
    accessorKey: "linkedin",
    header: "LinkedIn",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "bio",
    header: "Bio",
  },
]

export default async function AdminPage() {
  const personas = await db.persona.findMany({
    select: {
      id: true,
      name: true,
      bio: true,
      website: true,
      linkedin: true,
      user: true,
    },
  })

  console.log(personas)

  return (
    <DashboardShell>
      <DashboardHeader heading="Admin" text="Manage users." />
      <div className="flex flex-col max-w-full gap-10">
        <DataTable columns={columns} data={personas} />
      </div>
    </DashboardShell>
  )
}
