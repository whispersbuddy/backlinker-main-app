// @ts-nocheck
import { UserSubscriptionPlan } from "types"
import { env } from "@/env.mjs"
import { db } from "@/lib/db"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!user) {
    console.error("User not found")
    throw new Error("User not found")
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
  
  return {
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}

export function getPlanType(planId: string): {
  name: string
  duration: string
  priceId: string
} {
  switch (planId) {
    case env.STRIPE_STANDARD_MONTHLY_PLAN_ID: {
      return {
        name: "Standard",
        duration: "monthly",
        priceId: env.STRIPE_STANDARD_MONTHLY_PLAN_ID,
      }
    }
    case env.STRIPE_STANDARD_YEARLY_PLAN_ID: {
      return {
        name: "Standard",
        duration: "yearly",
        priceId: env.STRIPE_STANDARD_YEARLY_PLAN_ID,
      }
    }
    case env.STRIPE_PRO_MONTHLY_PLAN_ID: {
      return {
        name: "Pro",
        duration: "monthly",
        priceId: env.STRIPE_PRO_MONTHLY_PLAN_ID,
      }
    }
    case env.STRIPE_PRO_YEARLY_PLAN_ID: {
      return {
        name: "Pro",
        duration: "yearly",
        priceId: env.STRIPE_PRO_YEARLY_PLAN_ID,
      }
    }
    default:
      return {
        name: "",
        duration: "",
        priceId: "",
      }
  }
}
