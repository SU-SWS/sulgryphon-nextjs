"use client"

import Script from "next/script"
import {GoogleAnalytics} from "@next/third-parties/google"
import {usePathname} from "next/navigation"

/**
 * Analytics are skipped for editors previewing content. Checking the route instead of the preview
 * cookie keeps the root layout free of request data, so public pages stay fully static.
 */
const Analytics = ({gaId}: {gaId: string}) => {
  if (usePathname().startsWith("/preview")) return null
  return (
    <>
      <Script async src="//siteimproveanalytics.com/js/siteanalyze_6343745.js" />
      <GoogleAnalytics gaId={gaId} />
    </>
  )
}
export default Analytics
