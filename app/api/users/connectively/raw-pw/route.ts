import { z } from "zod"

import { decrypt } from "@/lib/db"
import { decryptPwSchema } from "@/lib/validations/user"

export async function POST(req: Request) {
  try {
    // Get the request body and validate it.
    const body = await req.json()
    const payload = decryptPwSchema.parse(body)
    const decryptedPassword = decrypt(payload.password)

    if (!decryptedPassword) {
      return new Response("Missing connectively password", { status: 204 })
    }

    return new Response(decryptedPassword, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
