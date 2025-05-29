import NodePageDisplay from "@/components/node"
import {notFound, redirect} from "next/navigation"
import LibraryHeader from "@/components/node/sul-library/library-header"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import SecondaryMenu from "@/components/menu/secondary-menu"
import {getAllNodePaths, getEntityFromPath, getMenu} from "@/lib/gql/fetcher"
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d"
import EditorAlertBanner from "@/components/patterns/elements/editor-alert-banner"
import FlushCache from "@/components/patterns/elements/flush-cache"
import OnThisPage from "@/components/patterns/on-this-page"
import DrupalLink from "@/components/patterns/elements/drupal-link"
import {buildUrl, getPathFromContext, PageProps, Slug} from "@/lib/drupal/utils"
import RosetteIcon from "@/components/patterns/icons/RosetteIcon"
import Image from "next/image"

export const revalidate = false
export const dynamic = "force-static"
export const maxDuration = 60

const NodePage = async (props: PageProps & {previewMode?: true}) => {
  const params = await props.params
  const path = getPathFromContext(params.slug)

  const {redirect: routeRedirect, entity} = await getEntityFromPath<NodeUnion>(path, props.previewMode)

  if (routeRedirect) redirect(routeRedirect)
  if (!entity) notFound()

  const menuItems = await getMenu()

  const fullWidth =
    (entity.__typename === "NodeStanfordPage" && entity.layoutSelection?.id === "stanford_basic_page_full") ||
    (entity.__typename === "NodeSulLibrary" && entity.layoutSelection?.id === "sul_library_full_width")

  const sulSidebar =
    (entity.__typename === "NodeStanfordPage" && entity.layoutSelection?.id === "sul_side_nav") ||
    (entity.__typename === "NodeStanfordNews" && entity.layoutSelection?.id === "sul_news_side_nav") ||
    (entity.__typename === "NodeSulLibrary" && entity.layoutSelection?.id === "sul_branch_side_nav")

  return (
    <main id="main-content" className="mb-50">
      <article aria-labelledby={entity.id}>
        {process.env.VERCEL_ENV !== "production" && <FlushCache currentPath={path} />}

        {!entity.status && <EditorAlertBanner message="Unpublished Content" />}
        {entity.__typename === "NodeSulLibrary" && <LibraryHeader node={entity} />}

        {entity.__typename === "NodeStanfordNews" && (
          <InternalHeaderBanner>
            <div className="mx-auto mb-65 mt-48 flex w-full max-w-[calc(100vw-10rem)] flex-col p-0 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]">
              <h1 id={entity.id} className="order-2 mb-0">
                {entity.title}
              </h1>

              {entity.suNewsTopics && (
                <div className="order-1 mb-1">
                  {entity.suNewsTopics.slice(0, 1).map(topic => (
                    <span key={topic.id} className="text-16 font-semibold uppercase text-cardinal-red md:text-18">
                      {topic.name}
                    </span>
                  ))}
                </div>
              )}
              {entity.suNewsDek && <p className="order-3 mb-0 text-20 leading sm:text-22">{entity.suNewsDek}</p>}
            </div>
          </InternalHeaderBanner>
        )}

        {entity.__typename === "NodeStanfordPerson" && (
          <InternalHeaderBanner>
            <div className="mx-auto mb-40 mt-48 flex w-full max-w-[calc(100vw-10rem)] flex-col items-center gap-32 p-0 md:mb-10 md:max-w-[calc(100vw-20rem)] md:flex-row 3xl:max-w-[calc(1500px-20rem)]">
              <div className="order-2 flex flex-col">
                <h1 id={entity.id} className="mb-0">
                  {entity.title}
                </h1>
                <div>
                  {(entity.suPersonFullTitle || entity.suPersonShortTitle) && (
                    <div className="text-20 md:text-22">{entity.suPersonFullTitle || entity.suPersonShortTitle}</div>
                  )}

                  {entity.suPersonPronouns && (
                    <div className="text-20 md:text-22">Pronouns: {entity.suPersonPronouns}</div>
                  )}
                </div>
              </div>

              {entity.suPersonPhoto && (
                <div className="order-1">
                  <div className="relative aspect-[1/1] w-220">
                    <Image
                      src={buildUrl(entity.suPersonPhoto?.mediaImage.url).toString()}
                      alt=""
                      className="rounded-full object-cover"
                      fill
                      sizes="500px"
                    />
                  </div>
                </div>
              )}
            </div>
          </InternalHeaderBanner>
        )}

        {!(
          entity.__typename === "NodeSulLibrary" ||
          entity.__typename === "NodeStanfordNews" ||
          entity.__typename === "NodeStanfordPerson"
        ) && (
          <InternalHeaderBanner>
            <h1
              id={entity.id}
              className="relative mx-auto mb-10 mt-75 flex w-full max-w-[calc(100vw-10rem)] flex-row gap-20 p-0 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]"
            >
              {entity.__typename === "NodeStanfordPage" && <RosetteIcon width={60} height={60} />}
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
            {sulSidebar && (
              <OnThisPage>
                {entity.sulRelLinks && (
                  <div className="lg:mt-40">
                    <h2
                      data-skip-heading="true"
                      className="type-0 m-0 block px-10 py-2 font-sans font-semibold text-cardinal-red lg:type-1 lg:mb-8 lg:p-0 lg:text-black"
                    >
                      {entity.sulRelLinksHeading || "Related content"}
                    </h2>
                    <ul className="list-none p-0">
                      {entity.sulRelLinks.map((link, index) => (
                        <li key={index} className="mb-0 lg:mb-12">
                          {link.url && (
                            <DrupalLink
                              href={link.url}
                              className="type-0 block break-words px-10 py-2 font-sans font-normal text-black no-underline hocus:bg-black-10 hocus:underline lg:p-0 lg:text-digital-blue lg:underline lg:hocus:bg-transparent"
                            >
                              {link.title}
                            </DrupalLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </OnThisPage>
            )}
            {!sulSidebar && <SecondaryMenu menuItems={menuItems} currentPath={entity.path} />}

            <div className="flex-1">
              <NodePageDisplay node={entity} aria-labelledby={entity.id} />
            </div>
          </div>
        )}
      </article>
    </main>
  )
}

export const generateStaticParams = async (): Promise<Array<Slug>> => {
  if (process.env.BUILD_COMPLETE !== "true") return []
  const nodePaths = await getAllNodePaths()
  return nodePaths.map(path => ({slug: path.split("/").filter(part => !!part)}))
}

export default NodePage
