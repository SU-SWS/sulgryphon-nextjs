"use client"

import {HTMLAttributes, useSyncExternalStore} from "react"
import CalendarFrame from "@/components/patterns/elements/calendar-frame"

const subscribe = () => () => {}

/** The last path segment of the browser's URL (`/calendar/<id>`). */
const getPathId = () => window.location.pathname.split("/").filter(Boolean).pop() ?? null

/**
 * The calendar widget for the id in the browser's URL.
 *
 * Used by the full /calendar page: reading the id in the browser rather than from the route params means
 * the page never renders on the server per id, so every `/calendar/<id>` is served by one static page.
 */
const CalendarFrameFromUrl = (props: Omit<HTMLAttributes<HTMLIFrameElement>, "id">) => {
  const id = useSyncExternalStore(subscribe, getPathId, () => null)
  return <CalendarFrame {...props} id={id} />
}

export default CalendarFrameFromUrl
