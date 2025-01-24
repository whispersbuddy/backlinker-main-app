// xd

'use client'

import { useEffect, useState } from "react"
import { BillingForm } from "@/components/billing-form"
import Pricing from "@/components/pricing"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { getSubscriptionPlanAction } from "@/app/actions/getSubscriptionPlanAction"

export default function BillingContent({ userId }: { userId: string }) {
  const [subscriptionPlan, setSubscriptionPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscriptionPlan = async () => {
      try {
        const plan = await getSubscriptionPlanAction(userId)
        setSubscriptionPlan(plan)
      } catch (error) {
        console.error("Error fetching subscription plan:", error)
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptionPlan()
  }, [userId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <>
      {subscriptionPlan && (
        <BillingForm subscriptionPlan={subscriptionPlan} />
      )}
      {!subscriptionPlan.isPro && <Pricing freeTierActive={false} />}
    </>
  )
}
