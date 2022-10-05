import * as React from "react"
import {useRouter} from "next/router"

export function PreviewAlert() {
  const {isPreview} = useRouter()
  const [showPreviewAlert, setShowPreviewAlert] = React.useState<boolean>(false)

  React.useEffect(() => {
    setShowPreviewAlert(isPreview && window.top === window.self)
  }, [isPreview])

  if (!showPreviewAlert) {
    return null
  }

  return (
    <div>
      <p>
        This page is a preview.{" "}
        {/* eslint-disable @next/next/no-html-link-for-pages */}
        <a href="/api/exit-preview">
          Click here
        </a>{" "}
        to exit preview mode.
      </p>
    </div>
  )
}
