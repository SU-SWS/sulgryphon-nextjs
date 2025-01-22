import {cookies, type UnsafeUnwrappedCookies} from "next/headers"

/*
 * Draft mode works when in normal builds. Use environment variable during development.
 */
export const isPreviewMode = (): boolean => {
  return (
    process.env.NODE_ENV === "development" ||
    (cookies() as unknown as UnsafeUnwrappedCookies)?.get("preview")?.value === process.env.DRUPAL_PREVIEW_SECRET
  )
}
