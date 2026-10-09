import NodePage from "../../[...slug]/page"
import DisablePreviewMode from "../disable-preview-mode"
import {PageProps} from "@/lib/drupal/utils"

const PreviewNodePage = (props: PageProps) => (
  <>
    <NodePage params={props.params} previewMode />
    <DisablePreviewMode />
  </>
)

export default PreviewNodePage
