"use client"

import {useLayoutEffect} from "react"

const DisablePreviewMode = () => {
  useLayoutEffect(() => {
    setTimeout(() => {
      fetch("/api/draft/disable", {cache: "no-cache"})
    }, 1000)
  }, [])
  return null
}
export default DisablePreviewMode
