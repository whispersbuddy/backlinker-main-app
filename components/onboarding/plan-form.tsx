"use client"

import React from "react"
import * as ToggleGroup from "@radix-ui/react-toggle-group"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import FormWrapper from "./form-wrapper"
import { FormItems } from "./index"

type stepProps = Partial<FormItems> & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void
}

const PlanForm = ({ updateForm, yearly }: stepProps) => {
  const [yearlyUpdated, setYearlyUpdated] = React.useState(yearly)

  const handleCheckedChange = (yearlyUpdated: boolean) => {
    setYearlyUpdated((prev) => !prev)
    updateForm({ yearly: yearlyUpdated })
  }

  return (
    <FormWrapper
      title="Select your plan"
      description="You have the option of monthly or yearly billing."
    >
      <ToggleGroup.Root
        orientation="horizontal"
        className="flex flex-col gap-3 my-2 md:flex-row md:items-center md:justify-around md:gap-0"
        type="single"
        value={"default"}
      >
        <ToggleGroup.Item
          value="default"
          className="border border-neutral-600 flex items-start gap-3 p-3 h-24 rounded-md aspect-square data-[state=on]:border-blue-500 data-[state=on]:bg-slate-300 focus:border-blue-500 outline-none hover:border-blue-500 md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
        >
          <div className="relative flex flex-col items-start -top-1 md:top-0">
            <p className="font-semibold">Pro Plan</p>
            <p className="text-sm">{yearly ? "$5,000/yr" : "$500/mo"}</p>
            {yearly && <span className="text-sm">2 months free</span>}
          </div>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          disabled
          value=""
          className="border border-neutral-600 flex items-start gap-3 p-3 h-24 rounded-md aspect-square outline-none md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
        >
          <div className="relative flex flex-col items-start -top-1 md:top-0">
            <p className="font-semibold">More options soon...</p>
          </div>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <div className="flex items-center justify-center w-full p-3 rounded-md">
        <div className="flex items-center gap-6">
          <Label htmlFor="duration" className={yearly ? "" : "text-blue-500"}>
            Monthly
          </Label>
          <Switch
            id="duration"
            checked={yearlyUpdated}
            onCheckedChange={handleCheckedChange}
          />
          <Label htmlFor="duration" className={yearly ? "text-blue-500" : ""}>
            Yearly
          </Label>
        </div>
      </div>
    </FormWrapper>
  )
}

export default PlanForm
