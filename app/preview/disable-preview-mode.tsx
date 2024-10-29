"use client"

import {useLayoutEffect} from "react"

const DisablePreviewMode = () => {
  useLayoutEffect(() => {
    setTimeout(() => {
      fetch("/api/draft/disable").catch(_e => console.warn("Failed to disable preview mode"))
    }, 1000)
  }, [])
  return null
}
export default DisablePreviewMode
