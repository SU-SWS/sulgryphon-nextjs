import {ReactNode} from "react"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import Editori11y from "@/components/editori11y"
import EditorAlertBanner from "@/components/patterns/elements/editor-alert-banner"

const RootLayout = async ({children}: {children: ReactNode}) => {
  const previewMode = isPreviewMode()
  return (
    <>
      {previewMode && (
        <>
          <EditorAlertBanner message="Previewing Content" />
          <Editori11y />
        </>
      )}
      {children}
    </>
  )
}
export default RootLayout
