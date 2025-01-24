"use client"

import React from "react"
import { hotjar } from "react-hotjar"

const siteId = 3656420
const hotjarVersion = 6

export default function HotJar() {
  React.useEffect(() => {
    hotjar.initialize({
      id: siteId,
      sv: hotjarVersion
    })
  }, [])

  return null
}
