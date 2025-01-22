import {notFound} from "next/navigation"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import NodePage from "../../[...slug]/page"
import DisablePreviewMode from "../disable-preview-mode"
import {PageProps} from "@/lib/drupal/utils"

const PreviewNodePage = async (props: PageProps) => {
  if (!isPreviewMode()) notFound()
  return (
    <>
      <NodePage params={props.params} previewMode={true} />
      <DisablePreviewMode />
    </>
  )
}

export default PreviewNodePage
