"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Badge } from "./ui/badge"
import { buttonVariants } from "./ui/button"

export default function Pricing({
  freeTierActive,
}: {
  freeTierActive: boolean
}) {
  const isYearlyBilling = false // You might want to make this dynamic based on user preference

  return (
    <section className="w-full">
      <div className="flex flex-col justify-center gap-6 my-4 md:gap-9">
        <div className="flex flex-col items-center gap-3 justify-center space-x-2.5">
          {isYearlyBilling && (
            <Badge className="align-middle bg-blue-500 text">
              2 Months FREE!
            </Badge>
          )}
        </div>
        <div className="flex flex-col justify-center gap-4 lg:flex-row">
          <PricingCard
            title="Pro"
            monthlyPrice={300}
            isYearlyBilling={isYearlyBilling}
            priceId={
              isYearlyBilling
                ? env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID
                : env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID
            }
            ctaButton="Start Now"
            freeTierActive={freeTierActive}
          >
            <ul className="flex flex-col mt-8 space-y-4">
              <li className="inline-flex items-center space-x-2">
                <Icons.check />
                <span className="text-base font-medium">1 Profile/Website</span>
              </li>
              <li className="inline-flex items-center space-x-2">
                <Icons.check />
                <span className="text-base font-medium">100+ Pitches/month</span>
              </li>
              <li className="inline-flex items-center space-x-2">
                <Icons.check />
                <span className="text-base font-medium">Progress Reports (Monthly)</span>
              </li>
              <li className="inline-flex items-center space-x-2">
                <Icons.check />
                <span className="text-base font-medium">
                  Submit on Featured/Terkel <br />
                  ($100/mo retail value)
                </span>
              </li>
              <li className="inline-flex items-center space-x-2">
                <Icons.check />
                <span className="text-base font-medium">10 Connectively Pitches</span>
              </li>
              <li className="inline-flex items-center space-x-2">
                <Icons.check />
                <span className="text-base font-medium">AI Trained On Your Biography</span>
              </li>
            </ul>
          </PricingCard>
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  title,
  monthlyPrice,
  isYearlyBilling,
  priceId,
  ctaButton,
  freeTierActive,
  children,
}: {
  title: string
  monthlyPrice: number
  isYearlyBilling: boolean
  priceId?: string
  ctaButton: string
  freeTierActive?: boolean
  children: React.ReactNode
}) {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const getStripeLink = async () => {
    setIsLoading(true)
    if (priceId) {
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ priceId }),
        })
        const { url } = await response.json()
        if (url) window.location.href = url
      } catch (error) {
        console.error("Error fetching Stripe link:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      push("/register")
    }
  }

  return (
    <div className="w-full bg-transparent border-2 rounded-md lg:w-fit">
      <div className="relative flex flex-col justify-center p-6 md:py-8 md:px-9">
        <h2 className="text-5xl font-bold">{title}</h2>
        <div className="flex items-end mt-5">
          <div className="flex items-start">
            <span className="text-xl font-medium">$</span>
            <p className="text-3xl font-medium tracking-tight">
              {isYearlyBilling ? monthlyPrice * 10 : monthlyPrice}
            </p>
          </div>
          <span className="ml-0.5 text-lg">
            {" "}
            / {isYearlyBilling ? "year" : "month"}
          </span>
        </div>
        {children}
        {!freeTierActive && (
          <button
            type="button"
            onClick={getStripeLink}
            disabled={isLoading}
            className={cn("mt-4 line-clamp-3", buttonVariants({ size: "lg" }))}
          >
            {isLoading ? "Loading..." : ctaButton}
          </button>
        )}
      </div>
    </div>
  )
}
