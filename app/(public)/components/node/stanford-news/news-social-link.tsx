"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {ErrorBoundary} from "react-error-boundary";

const NewsSocialLink = ({prefix, suffix = '', children, ...props}) => {
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