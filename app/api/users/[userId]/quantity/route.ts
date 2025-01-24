import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get a users subscription plan
    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    // Get the number of personas not used yet
    const availablePersonas = await db.persona.findMany({
      where: {
        userId: session.user.id,
      },
    })

    if (!subscriptionPlan.stripeSubscriptionId) {
      // Return 1 available persona if not yet used for free users
      return new Response(
        JSON.stringify({
          quantity: 1,
          availablePersonas: 1 - availablePersonas.length,
          message: "No subscription plan",
        }),
        {
          status: 200,
        }
      )
    }

    // Get the number of subscriptions the user has paid for
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )

    // Get the number of personas they can use
    const quantity = stripePlan.items.data[0].quantity || 1

    return new Response(
      JSON.stringify({
        quantity: quantity,
        availablePersonas: quantity - availablePersonas.length,
      }),
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
