/*
 Draft mode works only in normal builds, use environment variable during development.
 */
import {cookies} from "next/headers"

export const isPreviewMode = (): boolean => {
  return (
    process.env.NODE_ENV === "development" || cookies()?.get("preview")?.value === process.env.DRUPAL_PREVIEW_SECRET
  )
}
