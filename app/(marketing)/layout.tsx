"use client"

import Link from "next/link"
import { MenuProvider } from "@/context"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 z-40 w-full px-4 border-b border-gray-300 bg-background">
        <div className="flex items-center justify-between py-4 md:py-6">
          <MenuProvider>
            <MainNav items={marketingConfig.mainNav} />
          </MenuProvider>
          <nav className="flex flex-row items-center gap-3">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "px-4"
              )}
            >
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 mt-20">{children}</main>
      <SiteFooter />
    </div>
  )
}
