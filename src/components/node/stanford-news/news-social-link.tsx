"use client"

import Link from "@/components/patterns/elements/drupal-link"
import {HTMLAttributes} from "react"
import {ErrorBoundary} from "react-error-boundary"
import {useIsClient} from "usehooks-ts"

type Props = HTMLAttributes<HTMLAnchorElement> & {
  prefix: string
  suffix?: string
}

const NewsSocialLink = ({prefix, suffix = "", children, ...props}: Props) => {
  const isClient = useIsClient()
  if (!isClient) return

  return (
    <ErrorBoundary fallback={<></>} onError={e => console.error(e.message)}>
      <Link href={`${prefix}${document.URL}${suffix}`} prefetch={false} {...props}>
        {children}
      </Link>
    </ErrorBoundary>
  )
}
export default NewsSocialLink
