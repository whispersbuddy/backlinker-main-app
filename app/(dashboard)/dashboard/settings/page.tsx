import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"
import { UserWebsiteForm } from "@/components/user-website-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user) {
    notFound()
  }

  const userInfo = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      bio: true,
      website: true,
      connectivelyUsername: true,
      connectivelyPassword: true,
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage account settings." />
      <div className="flex flex-col max-w-full gap-10">
        <UserNameForm
          user={{ id: session.user.id, name: session.user.name || "" }}
        />
        <UserWebsiteForm
          user={{ id: session.user.id, website: userInfo?.website || "" }}
        />
      </div>
    </DashboardShell>
  )
}
