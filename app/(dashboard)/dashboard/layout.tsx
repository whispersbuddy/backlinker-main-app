import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { dashboardConfig } from "@/config/dashboard"
import { authOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
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

  return (
    <div className="flex flex-col min-h-screen space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center justify-between h-16 py-4">
          <MainNav items={dashboardConfig.mainNav} />
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
          <DashboardNav items={dashboardConfig.sidebarNav} />
          {!session.user.onboarded && (
            <Alert variant={"destructive"} className="mt-6">
              <Icons.warning className="w-4 h-4 dark:text-red-500" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Sign up{" "}
                <Link
                  className="text-blue-500 underline"
                  href="/dashboard/billing"
                >
                  here
                </Link>{" "}
                for a paid plan to get more pitch submissions!
              </AlertDescription>
            </Alert>
          )}
        </aside>
        <main className="flex flex-col flex-1 w-full overflow-hidden">
          <div
            className={cn(
              !session.user.onboarded ? "block mb-4 md:hidden" : "hidden"
            )}
          >
            {!session.user.onboarded && (
              <Alert variant={"destructive"}>
                <Icons.warning className="w-4 h-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  Signup for a paid plan to get pitch submissions!
                </AlertDescription>
              </Alert>
            )}
          </div>
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
