import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession()
  if (session?.user) return redirect("/dashboard")
  return <div className="min-h-screen">{children}</div>
}
