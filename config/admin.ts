import { DashboardConfig } from "types"

export const adminConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Users",
      href: "/admin",
      icon: "user",
    },
    {
      title: "User Personas",
      href: "/admin/personas",
      icon: "settings",
    },
    {
      title: "Paying Users",
      href: "/admin/subscriptions",
      icon: "billing",
    },
  ],
}
