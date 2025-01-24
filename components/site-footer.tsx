import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-row items-center justify-between gap-4 py-10 md:h-24 md:py-0">
        <div className="flex flex-row items-center gap-4 md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-sm leading-loose text-center md:text-left">
            <a
              href="https://backlinker.ai"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Backlinker.AI
            </a>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
