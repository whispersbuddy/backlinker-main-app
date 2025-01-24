import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { Suspense } from 'react'

import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import BillingContent from './BillingContent'

export default async function BillingPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <Suspense fallback={<div>Loading...</div>}>
        <BillingContent userId={session.user.id} />
      </Suspense>
    </DashboardShell>
  )
}
