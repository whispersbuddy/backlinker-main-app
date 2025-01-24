import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET() {
  // Get list of users who are new sign ups (newSignup)
  // const newUsers = await db.user.findMany({
  //   where: {
  //     newSignup: true,
  //   },
  // })
  // Map through users and send welcome email
  // newUsers.map()
  // For each successful email sent, update the users `newSignup` field
  return NextResponse.json({ ok: true })
}
