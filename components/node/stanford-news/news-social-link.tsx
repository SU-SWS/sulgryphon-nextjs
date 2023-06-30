"use client";

import Link from "@/components/patterns/elements/drupal-link";
import {PropsWithoutRef, ReactNode, useEffect, useState} from "react";
import {ErrorBoundary} from "react-error-boundary";

interface Props extends PropsWithoutRef<any> {
  prefix: string
  suffix?: string
  children?: ReactNode
}

const NewsSocialLink = ({prefix, suffix = '', children, ...props}: Props) => {
  const [currentUrl, setCurrentUrl] = useState('#')

  useEffect(() => {
    setCurrentUrl(document.URL);
  }, [])

  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <Link href={`${prefix}${currentUrl}${suffix}`} {...props}>
        {children}
      </Link>
    </ErrorBoundary>
  )
}
export default NewsSocialLink;