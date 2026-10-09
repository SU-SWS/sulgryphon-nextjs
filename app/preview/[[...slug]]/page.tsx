import NodePageDisplay from "@/components/node"
import HomePage from "@/components/node/stanford-page/home-page/home-page"
import EditorAlertBanner from "@/components/patterns/elements/editor-alert-banner"
import Editori11y from "@/components/editori11y"
import {NodeUnion} from "@/lib/gql/__generated__/graphql"
import {getEntityFromPath, getHomePagePath} from "@/lib/gql/gql-queries"
import {getPathFromContext, Slug} from "@/lib/drupal/utils"
import {notFound} from "next/navigation"
import {Suspense} from "react"

// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60

// Access is checked in proxy.ts: every request must carry the preview secret, so this page never sees
// an unauthorized request.
const PreviewPage = (props: {params: Promise<Partial<Slug>>}) => (
  <>
    <EditorAlertBanner message="Previewing Content" />
    <Editori11y />
    <Suspense>
      <PreviewContent params={props.params} />
    </Suspense>
  </>
)

// Deliberately uncached: this renders draft content for an editor, so every request re-reads it from
// Drupal. It streams inside the Suspense boundary above.
const PreviewContent = async ({params}: {params: Promise<Partial<Slug>>}) => {
  const path = getPathFromContext((await params).slug || [])

  // The home page has its own layout. Drupal may send its alias (e.g. `/home`) or `/`.
  if (path === "/" || path === (await getHomePagePath())) return <HomePage previewMode />

  const {entity} = await getEntityFromPath<NodeUnion>(path, true)
  if (!entity) notFound()

  return (
    <main id="main-content" className="mb-50">
      {!entity.status && <EditorAlertBanner message="Unpublished Content" />}
      <NodePageDisplay node={entity} />
    </main>
  )
}

export default PreviewPage
