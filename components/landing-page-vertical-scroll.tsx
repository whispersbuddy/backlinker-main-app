"use client"

import React from "react"

const TEXT_OPTIONS = ["build backlinks", "reply to reporters", "rank on Google"]

export default function LandingPageVerticalScroll() {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % TEXT_OPTIONS.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])
  return (
    <span className="border-b-[12px] border-solid border-blue-500">
      {TEXT_OPTIONS[currentTextIndex]}
    </span>
  )
}
