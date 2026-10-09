import {ReactNode} from "react"
import {notFound} from "next/navigation"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import Editori11y from "@/components/editori11y"
import EditorAlertBanner from "@/components/patterns/elements/editor-alert-banner"

// Preview reads the preview cookie and renders uncached draft content, so every request is
// request-time. proxy.ts rejects requests without the cookie with a real 404 before rendering; the
// check below is a second line of defense.
export const instant = false

const PreviewLayout = async ({children}: {children: ReactNode}) => {
  if (!(await isPreviewMode())) notFound()
  return (
    <>
      <EditorAlertBanner message="Previewing Content" />
      <Editori11y />
      {children}
    </>
  )
}
export default PreviewLayout
