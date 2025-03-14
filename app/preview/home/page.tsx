import {notFound} from "next/navigation"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import Page from "../../page"

const PreviewHomePage = async () => {
  if (!(await isPreviewMode())) notFound()
  return <Page />
}

export default PreviewHomePage
