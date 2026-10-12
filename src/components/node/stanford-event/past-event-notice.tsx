"use client"

import {HTMLAttributes, ReactNode, useSyncExternalStore} from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  /**
   * Event end time, in milliseconds.
   */
  endTime: number
  children: ReactNode
}

/**
 * Display the children only once the event has ended.
 *
 * Checked on the client so the prerendered page doesn't freeze "now" at build time.
 */
const subscribe = () => () => {}

const PastEventNotice = ({endTime, children, ...props}: Props) => {
  // The server snapshot is always "not past", so the prerendered page never reads the clock.
  const inPast = useSyncExternalStore(
    subscribe,
    () => endTime < Date.now(),
    () => false
  )
  if (!inPast) return null
  return <div {...props}>{children}</div>
}

export default PastEventNotice
