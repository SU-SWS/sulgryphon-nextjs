"use server"

import {revalidatePath, updateTag} from "next/cache"

/**
 * Clear the cached page and its data for the submitted path.
 *
 * The path arrives as a form field rather than a closure variable, so rendering the button doesn't
 * need to encrypt bound values and the page can still be prerendered.
 */
export const flushPathCache = async (formData: FormData) => {
  // The button only renders outside production, and the path is caller-controlled, so refuse it there.
  if (process.env.VERCEL_ENV === "production") return

  const path = formData.get("path")
  if (typeof path !== "string" || !path.startsWith("/")) return

  revalidatePath(path)
  // Expire immediately rather than serving stale-while-revalidate, so the reload shows fresh content.
  updateTag(`paths:${path}`)
}
