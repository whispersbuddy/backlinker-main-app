"use client"

import React from "react"

export function useMultiplestepForm(steps: number) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)
  const [showSuccessMsg, setShowSuccessMsg] = React.useState(false)

  const nextStep = () => {
    if (currentStepIndex < steps - 1) {
      setCurrentStepIndex((i) => i + 1)
    }
    if (currentStepIndex === 3) {
      setShowSuccessMsg(true)
    }
  }

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1)
    }
  }

  const goTo = (index: number) => {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps - 1,
    showSuccessMsg,
    goTo,
    nextStep,
    previousStep,
  }
}
