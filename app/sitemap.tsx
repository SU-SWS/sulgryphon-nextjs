import {MetadataRoute} from "next"
import {graphqlClient} from "@/lib/gql/fetcher"
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 604800
export const dynamic = "force-static"
export const maxDuration = 60

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const nodeQuery = await graphqlClient({cache: "no-cache"}).Nodes()
  const nodes: NodeUnion[] = []

  nodeQuery.nodeStanfordCourses.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeStanfordEventSeriesItems.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeStanfordEvents.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeStanfordNewsItems.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeStanfordPages.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeStanfordPeople.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeStanfordPolicies.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeSulLibraries.nodes.map(node => nodes.push(node as NodeUnion))

  const sitemap: MetadataRoute.Sitemap = []

  nodes.map(node =>
    sitemap.push({
      url: `https://library.stanford.edu${node.path}`,
      lastModified: new Date(node.changed.time),
      priority: node.__typename === "NodeStanfordPage" ? 1 : 0.8,
      changeFrequency: node.__typename === "NodeStanfordPage" ? "weekly" : "monthly",
    })
  )

  return sitemap
}
export default Sitemap
