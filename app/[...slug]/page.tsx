import NodePageDisplay from "@/components/node"
import {notFound, redirect} from "next/navigation"
import {Metadata} from "next"
import {getNodeMetadata} from "./metadata"
import LibraryHeader from "@/components/node/sul-library/library-header"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import SecondaryMenu from "@/components/menu/secondary-menu"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import {getAllNodePaths, getEntityFromPath, getMenu} from "@/lib/gql/fetcher"
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d"
import EditorAlertBanner from "@/components/patterns/elements/editor-alert-banner"

export const revalidate = false
export const dynamic = "force-static"

const NodePage = async ({params, previewMode}: PageProps) => {
  const path = getPathFromContext({params})
  const {redirect: routeRedirect, entity} = await getEntityFromPath<NodeUnion>(path, previewMode)

  if (routeRedirect) redirect(routeRedirect.url)
  if (!entity) notFound()

  const menuItems = await getMenu()

  const fullWidth =
    (entity.__typename === "NodeStanfordPage" && entity.layoutSelection?.id === "stanford_basic_page_full") ||
    (entity.__typename === "NodeSulLibrary" && entity.layoutSelection?.id === "sul_library_full_width")

  return (
    <main id="main-content" className="mb-50">
      {!entity.status && <EditorAlertBanner message="Unpublished Content" />}
      {entity.__typename === "NodeSulLibrary" && <LibraryHeader node={entity} />}

      {entity.__typename === "NodeStanfordNews" && (
        <InternalHeaderBanner>
          <div className="mx-auto mb-50 mt-80 flex w-full max-w-[calc(100vw-10rem)] flex-col p-0 md:mt-100 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]">
            <h1 className="order-2 text-white">{entity.title}</h1>

            {entity.suNewsTopics && (
              <div className="order-1 mb-20">
                {entity.suNewsTopics.slice(0, 1).map(topic => (
                  <span key={topic.id} className="font-semibold text-illuminating-dark">
                    {topic.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </InternalHeaderBanner>
      )}

      {!(entity.__typename === "NodeSulLibrary" || entity.__typename === "NodeStanfordNews") && (
        <InternalHeaderBanner>
          <h1 className="relative mx-auto mb-50 mt-80 w-full max-w-[calc(100vw-10rem)] p-0 text-white md:mt-100 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]">
            {entity.title}
          </h1>
        </InternalHeaderBanner>
      )}

      {fullWidth && (
        <div>
          <NodePageDisplay node={entity} />
        </div>
      )}

      {!fullWidth && (
        <div className="centered flex flex-col justify-between gap-[8rem] lg:flex-row">
          <div className="order-last flex-1">
            <NodePageDisplay node={entity} />
          </div>

          <SecondaryMenu menuItems={menuItems} currentPath={entity.path} />
        </div>
      )}
    </main>
  )
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  if (isPreviewMode()) return {}
  const path = getPathFromContext({params})
  const {entity} = await getEntityFromPath<NodeUnion>(path)
  return entity ? getNodeMetadata(entity) : {}
}

export const generateStaticParams = async (): Promise<PageProps["params"][]> => {
  if (process.env.BUILD_COMPLETE !== "true") return []
  const nodePaths = await getAllNodePaths()
  return nodePaths.map(path => ({slug: path.split("/").filter(part => !!part)}))
}

const getPathFromContext = (context: PageProps, prefix = ""): string => {
  let {slug} = context.params

  slug = Array.isArray(slug) ? slug.map(s => encodeURIComponent(s)).join("/") : slug
  slug = slug.replace(/^\//, "")
  return prefix ? `${prefix}/${slug}` : `/${slug}`
}

type PageProps = {
  params: {slug: string | string[]}
  searchParams?: Record<string, string | string[] | undefined>
  previewMode?: boolean
}

export default NodePage
