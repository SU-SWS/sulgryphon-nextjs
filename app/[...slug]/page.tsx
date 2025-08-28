import NodePageDisplay from "@/components/node"
import {notFound, redirect} from "next/navigation"
import {getAllNodePaths, getEntityFromPath} from "@/lib/gql/fetcher"
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d"
import EditorAlertBanner from "@/components/patterns/elements/editor-alert-banner"
import FlushCache from "@/components/patterns/elements/flush-cache"
import {getPathFromContext, PageProps, Slug} from "@/lib/drupal/utils"

export const revalidate = false
export const dynamic = "force-static"
export const maxDuration = 60

const NodePage = async (props: PageProps & {previewMode?: true}) => {
  const params = await props.params
  const path = getPathFromContext(params.slug)

  const {redirect: routeRedirect, entity} = await getEntityFromPath<NodeUnion>(path, props.previewMode)

  if (routeRedirect) redirect(routeRedirect)
  if (!entity) notFound()

  return (
    <main id="main-content" className="mb-50">
      {process.env.VERCEL_ENV !== "production" && <FlushCache currentPath={path} />}
      {!entity.status && <EditorAlertBanner message="Unpublished Content" />}
      <NodePageDisplay node={entity} />
    </main>
  )
}

export const generateStaticParams = async (): Promise<Array<Slug>> => {
  if (process.env.BUILD_COMPLETE !== "true") return []
  const nodePaths = await getAllNodePaths()
  return nodePaths.map(path => ({slug: path.split("/").filter(part => !!part)}))
}

export default NodePage
