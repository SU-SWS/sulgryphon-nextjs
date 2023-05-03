'use client'

import {useEffect} from 'react'
import useNavigationEvent from "@/lib/hooks/useNavigationEvent";

const ScrollUp = () => {
  const browserUrl = useNavigationEvent();
  useEffect(() => {
    // It's only an issue on netlify, so we only need to fix it there. This also prevents local dev builds from
    // scrolling when hotreload happens. Also make sure the url doesn't have a hash, since that means we're linking to
    // an anchor on the page.
    if (process.env.NETLIFY && !window.location.hash) window.document.scrollingElement?.scrollTo(0, 0)
  }, [browserUrl])
  return null
}
export default ScrollUp;