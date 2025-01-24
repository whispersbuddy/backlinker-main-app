"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { MenuContext } from "@/context"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const { toggle, toggleFunction } = React.useContext(MenuContext)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        onClick={() => toggleFunction(!toggle)}
        className="items-center hidden space-x-2 md:flex"
      >
        <Icons.logo className="text-blue-500" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
              scroll
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => toggleFunction(!toggle)}
      >
        {toggle ? (
          <Icons.close className="text-blue-500" />
        ) : (
          <Icons.menu className="text-blue-500" />
        )}
        <span className="font-bold">Backlinker</span>
      </button>
      {toggle && items && items.length > 0 && (
        <MobileNav
          toggleFunction={toggleFunction}
          toggle={toggle}
          items={items}
        >
          {children}
        </MobileNav>
      )}
    </div>
  )
}
