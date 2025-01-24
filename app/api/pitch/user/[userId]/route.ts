import { z } from "zod"

import { db } from "@/lib/db"
import { newPitchSchema } from "@/lib/validations/pitch"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

const BACKLINKER_SERVICE_SECRET = process.env.BACKLINKER_SERVICE_SECRET

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Check for authentication.
    const authHeader = req.headers.get("Authorization")

    if (!authHeader || authHeader !== BACKLINKER_SERVICE_SECRET) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = newPitchSchema.parse(body)

    // Update the user.
    const newPitch = await db.pitch.create({
      data: {
        subject: payload.subject,
        body: payload.content,
        query: payload.querySummary,
        queryRequirements: payload.queryRequirements,

        userId: params.userId,
      },
    })

    return new Response(JSON.stringify(newPitch), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
