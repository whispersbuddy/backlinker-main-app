import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { adminConfig } from "@/config/admin"
import { authOptions } from "@/lib/auth"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user) {
    redirect("/login")
  }

  if (!session?.user.email?.endsWith("@backlinker.ai")) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center justify-between h-16 py-4">
          <MainNav items={adminConfig.mainNav} />
          <div className="flex items-center justify-between gap-3">
            <UserAccountNav
              user={{
                name: session.user.name,
                image: session.user.image,
                email: session.user.email,
              }}
            />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={adminConfig.sidebarNav} />
        </aside>
        <main className="flex flex-col flex-1 w-full overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
