/*
 Draft mode works only in normal builds, use environment variable during development.
 */
import {cookies} from "next/headers"

export const isPreviewMode = async (): Promise<boolean> => {
  const cookieValues = await cookies()
  return (
    process.env.NODE_ENV === "development" || cookieValues.get("preview")?.value === process.env.DRUPAL_PREVIEW_SECRET
  )
}
