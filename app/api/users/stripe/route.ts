import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { getPlanType } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"

const billingUrl = absoluteUrl("/dashboard/billing")

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    const user = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    })

    if (!user) {
      return new Response(null, { status: 403 })
    }

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (user.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: billingUrl,
      })

      return new Response(JSON.stringify({ url: stripeSession.url }))
    }

    const { searchParams } = new URL(req.url)
    const priceId = searchParams.get("price_id")

    if (!priceId) {
      return new Response(null, { status: 404 })
    }

    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    })

    return new Response(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)

    return new Response(null, { status: 500 })
  }
}
