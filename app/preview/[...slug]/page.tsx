import {notFound} from "next/navigation";
import {isPreviewMode} from "@/lib/drupal/is-draft-mode";
import NodePage from "../../[...slug]/page";

const PreviewNodePage = async ({params}: PageProps) => {
  if (!isPreviewMode()) notFound();
  return <NodePage params={params}/>
}

type PageProps = {
  params: { slug: string | string[] }
  searchParams?: Record<string, string | string[] | undefined>
}


export default PreviewNodePage;