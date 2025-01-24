import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Personas",
      href: "/dashboard",
      icon: "user",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
  ],
}
