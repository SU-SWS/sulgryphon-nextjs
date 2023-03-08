"use client";

import Link from "next/link";
import {useEffect, useState} from "react";

const NewsSocialLink = ({prefix, suffix = '', children, ...props}) => {
  const [currentUrl, setCurrentUrl] = useState('#')

  useEffect(() => {
    setCurrentUrl(document.URL);
  }, [])

  return (
    <Link href={`${prefix}${currentUrl}${suffix}`} {...props}>
      {children}
    </Link>
  )
}
export default NewsSocialLink;