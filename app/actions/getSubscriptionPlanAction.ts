'use server'

import { getUserSubscriptionPlan } from "@/lib/subscription"
import { stripe } from "@/lib/stripe"

export async function getSubscriptionPlanAction(userId: string) {
  
  try {
    const subscriptionPlan = await getUserSubscriptionPlan(userId)


    let isCanceled = false
    let quantity = 1
    let isPro = false

    if (subscriptionPlan.stripeSubscriptionId && subscriptionPlan.stripeCurrentPeriodEnd) {
      isPro = new Date(subscriptionPlan.stripeCurrentPeriodEnd * 1000).getTime() + 86_400_000 > Date.now()
      
      if (isPro) {
        const stripePlan = await stripe.subscriptions.retrieve(
          subscriptionPlan.stripeSubscriptionId
        )
        isCanceled = stripePlan.cancel_at_period_end

        if (stripePlan.items.data[0].quantity) {
          quantity = stripePlan.items.data[0].quantity
        }
      } else {
        console.log('User subscription has expired')
      }
    } else {
      console.log('User does not have an active subscription')
    }

    const result = {
      ...subscriptionPlan,
      isPro,
      isCanceled,
      quantity,
    }
    console.log('Returning result:', result)
    return result
  } catch (error) {
    console.error('Error in getSubscriptionPlanAction:', error)
    throw error;
  }
}
