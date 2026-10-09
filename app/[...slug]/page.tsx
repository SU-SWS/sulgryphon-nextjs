import NodePageDisplay from "@/components/node"
import {notFound, permanentRedirect, redirect} from "next/navigation"
import {getAllNodes, getEntityFromPath} from "@/lib/gql/gql-queries"
import {NodeUnion} from "@/lib/gql/__generated__/graphql"
import EditorAlertBanner from "@/components/patterns/elements/editor-alert-banner"
import FlushCache from "@/components/patterns/elements/flush-cache"
import {getPathFromContext, PageProps, Slug} from "@/lib/drupal/utils"

// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60

// Params are awaited outside of a Suspense boundary on purpose: paths not returned by
// generateStaticParams still render on their first request and are then cached (ISR), and
// redirects/404s keep their real status codes.
const NodePage = async (props: PageProps & {previewMode?: true}) => {
  const params = await props.params
  const path = getPathFromContext(params.slug)

  // Paths that start with /node/ should not be used.
  if (path.startsWith("/node/")) notFound()

  const {redirect: routeRedirect, entity} = await getEntityFromPath<NodeUnion>(path, props.previewMode)

  if (routeRedirect?.permanent) permanentRedirect(routeRedirect.url)
  if (routeRedirect) redirect(routeRedirect.url)
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
  // Cache Components requires at least one param to validate the route's static shell. `/home` is
  // the home page alias, which next.config.ts redirects to `/`, so it never serves stale content.
  if (process.env.BUILD_COMPLETE !== "true") return [{slug: ["home"]}]

  return (await getAllNodes())
    .map(node => node.path)
    .filter(path => !!path && path !== "/" && !path.startsWith("/node/"))
    .map(path => ({slug: (path as string).split("/").filter(part => !!part)}))
}

export default NodePage
