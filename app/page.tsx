import {Metadata} from "next"
import {getNodeMetadata} from "./[...slug]/metadata"
import HomePageBanner from "@/components/node/stanford-page/home-page/home-page-banner"
import {ParagraphRows} from "@/components/paragraph/rows/rows"
import {notFound} from "next/navigation"
import {getEntityFromPath} from "@/lib/gql/fetcher"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"
import FlushCache from "@/components/patterns/elements/flush-cache"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false
export const dynamic = "force-static"

export const generateMetadata = async (): Promise<Metadata> => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>("/")
  return entity ? getNodeMetadata(entity) : {}
}

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
      {process.env.VERCEL_ENV !== "production" && <FlushCache currentPath={"/"} />}
      <HomePageBanner />
      {entity.suPageComponents && <ParagraphRows items={entity.suPageComponents} fullWidth />}
      <div className="rs-py-4 centered">Last updated {lastUpdated}</div>
    </main>
  )
}

export default Page
