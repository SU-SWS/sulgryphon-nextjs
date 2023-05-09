'use client'

import {useEffect, useRef} from 'react'
import useNavigationEvent from "@/lib/hooks/useNavigationEvent";

const ScrollUp = () => {
  const isInitialMount = useRef(true);
  const browserUrl = useNavigationEvent();
  useEffect(() => {
    // No need to on initial mount.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // It's only an issue on netlify, so we only need to fix it there. This also prevents local dev builds from
    // scrolling when hotreload happens. Also make sure the url doesn't have a hash, since that means we're linking to
    // an anchor on the page.
    if (process.env.NEXT_PUBLIC_NETLIFY && !window.location.hash) window.document.scrollingElement?.scrollTo(0, 0)
  }, [browserUrl])
  return null
}
export default ScrollUp;