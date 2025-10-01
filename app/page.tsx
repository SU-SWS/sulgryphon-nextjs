import HomePageBanner from "@/components/node/stanford-page/home-page/home-page-banner"
import Rows from "@/components/paragraph/rows/rows"
import {notFound} from "next/navigation"
import {getEntityFromPath} from "@/lib/gql/fetcher"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"
import FlushCache from "@/components/patterns/elements/flush-cache"
import Paragraph from "@/components/paragraph"
import NodePageMetadata from "@/components/node/node-page-metadata"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false
export const dynamic = "force-static"
export const maxDuration = 60

const Page = async () => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>("/")

  if (!entity) notFound()

  const lastUpdated = new Date(entity.changed.time as string).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <main id="main-content" className="mb-50">
      <NodePageMetadata pageTitle={undefined} metatags={entity.metatag} />
      <h1 className="sr-only">Stanford University Libraries</h1>
      {process.env.VERCEL_ENV !== "production" && <FlushCache currentPath={"/"} />}

      {entity.suPageBanner?.__typename && <Paragraph paragraph={entity.suPageBanner} />}
      {!entity.suPageBanner?.__typename && <HomePageBanner />}

      {entity.suPageComponents && <Rows components={entity.suPageComponents} fullWidth />}
      <footer className="rs-py-4 centered">Last updated {lastUpdated}</footer>
    </main>
  )
}

export default Page
