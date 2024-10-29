"use client"

import Link from "@/components/patterns/elements/drupal-link"
import {HTMLAttributes, useEffect, useState} from "react"
import {ErrorBoundary} from "react-error-boundary"

type Props = HTMLAttributes<HTMLAnchorElement> & {
  prefix: string
  suffix?: string
}

const NewsSocialLink = ({prefix, suffix = "", children, ...props}: Props) => {
  const [currentUrl, setCurrentUrl] = useState("#")

  useEffect(() => {
    setCurrentUrl(document.URL)
  }, [])

  return (
    <ErrorBoundary fallback={<></>} onError={e => console.error(e.message)}>
      <Link href={`${prefix}${currentUrl}${suffix}`} prefetch={false} {...props}>
        {children}
      </Link>
    </ErrorBoundary>
  )
}
export default NewsSocialLink
