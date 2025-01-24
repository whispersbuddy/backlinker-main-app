"use client"

import FormWrapper from "./form-wrapper"
import { FormItems } from "./index"

type StepProps = Partial<FormItems> & {
  goTo: (index: number) => void
}

const FinalStep = ({ yearly, plan, goTo }: StepProps) => {
  let planPrice = 0
  switch (plan) {
    case "default":
      planPrice = 500
      break
    default:
      planPrice = 0
      break
  }

  return (
    <FormWrapper
      title="Finishing Up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="">
        <div className="p-4 mt-2 border rounded-md bg-neutral-900 border-neutral-700">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold text-white md:text-lg">
                {`${
                  plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : ""
                } (${yearly ? "Yearly" : "Monthly"})`}
              </h4>
              <button onClick={() => goTo(1)} className="text-sm text-blue-500">
                Change
              </button>
            </div>
            <p className="font-semibold text-white">{`$${
              yearly ? planPrice * 10 : planPrice
            }${yearly ? "/yr" : "/mo"}`}</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 my-4">
          <p className="text-neutral-400">
            Total (per {yearly ? "year" : "month"})
          </p>
          <p className="font-semibold text-blue-500 md:text-lg">
            +$
            {yearly ? planPrice * 10 : planPrice}/{yearly ? "yr" : "mo"}
          </p>
        </div>
      </div>
    </FormWrapper>
  )
}

export default FinalStep
