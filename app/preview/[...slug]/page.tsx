import {notFound} from "next/navigation";
import {isPreviewMode} from "@/lib/drupal/is-draft-mode";
import NodePage from "../../[...slug]/page";
import DisablePreviewMode from "../disable-preview-mode";

const PreviewNodePage = async ({params}: PageProps) => {
  if (!isPreviewMode()) notFound();
  return (
    <>
      <NodePage params={params} previewMode={true}/>
      <DisablePreviewMode/>
    </>
  )
}

type PageProps = {
  params: { slug: string | string[] }
  searchParams?: Record<string, string | string[] | undefined>
}


export default PreviewNodePage;