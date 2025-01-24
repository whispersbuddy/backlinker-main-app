"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { useMultiplestepForm } from "@/hooks/use-multi-step-form"

import { Button, buttonVariants } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { toast } from "../ui/use-toast"
import ConnectivelyForm from "./connectively-form"
import FinalStep from "./final-step"
import PlanForm from "./plan-form"
import SideBar from "./side-bar"
import SuccessMessage from "./success-message"
import UserInfoForm from "./user-info-form"

export type FormItems = {
  name: string
  bio: string
  website: string
  connectivelyUsername: string
  connectivelyPassword: string
  plan: string
  yearly: boolean
}

export function UserOnboarding({
  userId,
  onboarded,
  userInfo,
}: {
  userId: string
  onboarded: boolean
  userInfo: {
    name: string | null
    bio: string | null
    website: string | null
    connectivelyUsername: string | null
    connectivelyPassword: string | null
  }
}) {
  const { refresh } = useRouter()
  const [savingData, setSavingData] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: userInfo.name || "",
    bio: userInfo.bio || "",
    website: userInfo.website || "",
    connectivelyUsername: userInfo.connectivelyUsername || "",
    connectivelyPassword: userInfo.connectivelyPassword || "",
    plan: "default",
    yearly: true,
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4)
  const [stripeUrl, setStripeUrl] = React.useState("")

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, bio, website, connectivelyUsername, connectivelyPassword } =
      fieldToUpdate

    if (currentStepIndex === 0) {
      if (name && name.trim().length < 3) {
        setErrors((prevState) => ({
          ...prevState,
          name: "Name should be at least 3 characters long",
        }))
      } else if (name && name.trim().length > 15) {
        setErrors((prevState) => ({
          ...prevState,
          name: "Name should be no longer than 15 characters",
        }))
      } else {
        setErrors((prevState) => ({
          ...prevState,
          name: "",
        }))
      }

      if (bio && bio.trim().length < 50) {
        setErrors((prevState) => ({
          ...prevState,
          bio: "Bio should be at least 50 characters long",
        }))
      } else {
        setErrors((prevState) => ({
          ...prevState,
          bio: "",
        }))
      }

      if (
        website &&
        !/^(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}(\b|\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/.test(
          website
        )
      ) {
        setErrors((prevState) => ({
          ...prevState,
          website: "Please enter a valid website url",
        }))
      } else {
        setErrors((prevState) => ({
          ...prevState,
          website: "",
        }))
      }
    } else if (currentStepIndex === 1) {
      if (connectivelyUsername?.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          connectivelyUsername: "Please enter your connectively username",
        }))
      } else {
        setErrors((prevState) => ({
          ...prevState,
          connectivelyUsername: "",
        }))
      }

      if (connectivelyPassword?.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          connectivelyPassword: "Please enter your connectively password",
        }))
      } else {
        setErrors((prevState) => ({
          ...prevState,
          connectivelyPassword: "",
        }))
      }
    }

    setFormData({ ...formData, ...fieldToUpdate })
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(errors).some((error) => error)) {
      Object.values(errors).map((err) =>
        toast({
          title: "Something went wrong.",
          description: err,
          variant: "destructive",
        })
      )
      return
    }
    if (currentStepIndex < 3) {
      nextStep()
    } else {
      setSavingData(true)
      // Save all data
      const namePromise = fetch(`/api/users/${userId}/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
        }),
      })
      const bioPromise = fetch(`/api/users/${userId}/bio`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: formData.bio,
        }),
      })
      const websitePromise = fetch(`/api/users/${userId}/website`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website: formData.website,
        }),
      })
      const connectivelyInfoPromise = fetch(
        `/api/users/${userId}/connectively`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            connectivelyUsername: formData.connectivelyUsername,
            connectivelyPassword: formData.connectivelyPassword,
          }),
        }
      )
      const userOnboardedPromise = fetch(`/api/users/${userId}/onboarding`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          onboarded: true,
        }),
      })

      Promise.all([
        namePromise,
        bioPromise,
        websitePromise,
        connectivelyInfoPromise,
        userOnboardedPromise,
      ])
        .then(() => {
          nextStep()
        })
        .catch(() => {
          toast({
            title: "Something went wrong.",
            description: "Please refresh the page and try again.",
            variant: "destructive",
          })
        })
        .finally(async () => {
          // Get a Stripe session URL.
          const response = await fetch(
            `/api/users/stripe?duration=${
              formData.yearly ? "yearly" : "monthly"
            }`
          )

          if (!response?.ok) {
            toast({
              title: "Something went wrong.",
              description: "Please refresh the page and try again.",
              variant: "destructive",
            })
          } else {
            // Redirect to the Stripe session.
            // This could be a checkout page for initial upgrade.
            // Or portal to manage existing subscription.
            const session = await response.json()
            if (session) {
              setStripeUrl(session.url)
            }
          }

          setSavingData(false)
        })
    }
  }

  return (
    <Dialog onOpenChange={() => refresh()}>
      <DialogTrigger asChild>
        {!onboarded && (
          <button
            className={cn(
              "relative",
              buttonVariants({ variant: "secondary" }),
              "text-blue-500 border border-blue-500"
            )}
          >
            <span className="absolute top-[-4px] left-[-4px] rounded-full z-20 w-3 h-3 animate-pulse bg-amber-400" />
            Complete Onboarding
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-fit mt-20 md:mt-auto md:min-w-[800px]">
        <div
          className={`flex justify-between ${
            currentStepIndex === 1 ? "h-[600px] md:h-[500px]" : "h-[500px]"
          } w-11/12 max-w-4xl relative m-1 rounded-lg p-4`}
        >
          {!showSuccessMsg ? (
            <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
          ) : null}
          <main
            className={`${
              showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"
            }`}
          >
            {showSuccessMsg ? (
              <AnimatePresence mode="wait">
                <SuccessMessage stripeUrl={stripeUrl} />
              </AnimatePresence>
            ) : (
              <form
                onSubmit={handleOnSubmit}
                className="flex flex-col justify-between w-full h-full"
              >
                <AnimatePresence mode="wait">
                  {currentStepIndex === 0 && (
                    <UserInfoForm
                      plan={"default"}
                      yearly={false}
                      key="step1"
                      name={formData.name || ""}
                      bio={formData.bio || ""}
                      website={formData.website || ""}
                      updateForm={updateForm}
                      errors={errors}
                    />
                  )}
                  {currentStepIndex === 1 && (
                    <ConnectivelyForm
                      key="step2"
                      updateForm={updateForm}
                      errors={errors}
                      connectivelyUsername={formData.connectivelyUsername || ""}
                      connectivelyPassword={formData.connectivelyPassword || ""}
                    />
                  )}
                  {currentStepIndex === 2 && (
                    <PlanForm
                      key="step3"
                      plan={formData.plan}
                      yearly={formData.yearly}
                      updateForm={updateForm}
                    />
                  )}
                  {currentStepIndex === 3 && (
                    <FinalStep
                      key="step4"
                      plan={formData.plan}
                      yearly={formData.yearly}
                      goTo={goTo}
                    />
                  )}
                </AnimatePresence>
                <div className="flex items-center justify-between w-full">
                  <div className="">
                    <Button
                      onClick={previousStep}
                      type="button"
                      variant="ghost"
                      className={`${
                        isFirstStep
                          ? "invisible"
                          : cn(
                              buttonVariants({ variant: "secondary" }),
                              "visible"
                            )
                      }`}
                    >
                      Go Back
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                      <Button
                        type="submit"
                        disabled={
                          savingData ||
                          (currentStepIndex === 0 &&
                            ((!!errors.name && errors.name.length > 0) ||
                              (!!errors.website && errors.website.length > 0) ||
                              (!!errors.bio && errors.bio.length > 0) ||
                              formData.name?.length === 0 ||
                              formData.website?.length === 0 ||
                              formData.bio?.length === 0)) ||
                          (currentStepIndex === 1 &&
                            ((!!errors.connectivelyUsername &&
                              errors.connectivelyUsername.length > 0) ||
                              (!!errors.connectivelyPassword &&
                                errors.connectivelyPassword.length > 0) ||
                              formData.connectivelyUsername?.length === 0 ||
                              formData.connectivelyPassword?.length === 0))
                        }
                        className={cn(buttonVariants({ variant: "default" }))}
                      >
                        {isLastStep ? "Confirm" : "Next Step"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  )
}
