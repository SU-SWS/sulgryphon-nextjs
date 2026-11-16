"use client"

import {SubmitEvent, useTransition} from "react"
import {flushPathCache} from "@/components/patterns/elements/flush-cache-action"

/**
 * The action is called from the submit handler rather than passed as the form's `action`. React renders a server
 * action form with `action=""`, which isn't valid HTML (an action must be a non-empty URL).
 */
const FlushCache = ({currentPath}: {currentPath: string}) => {
  const [isPending, startTransition] = useTransition()

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => flushPathCache(formData))
  }

  return (
    <form onSubmit={onSubmit} className="fixed bottom-0 z-50">
      <input type="hidden" name="path" value={currentPath} />
      <button type="submit" className="rounded-full bg-white p-4 hocus:underline" disabled={isPending}>
        Clear this page cache
      </button>
    </form>
  )
}

export default FlushCache
