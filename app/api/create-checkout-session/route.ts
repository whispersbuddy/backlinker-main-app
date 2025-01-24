import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { env } from "@/env.mjs"

const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: '2022-11-15', // Use the latest API version
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { priceId } = await req.json()

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription', // Changed to 'subscription' for recurring payments
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
