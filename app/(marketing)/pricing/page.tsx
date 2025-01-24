"use client"
// xd
import React from "react"

import Pricing from "@/components/pricing"

export default function PricingPage() {
  return (
    <div className="flex flex-col py-10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Pricing & Plans
        </h2>
      </div>
      <Pricing freeTierActive={false} />
    </div>
  )
}
