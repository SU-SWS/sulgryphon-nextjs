import {MetadataRoute} from "next"
import {getAllNodes} from "@/lib/gql/gql-queries"

// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  return (await getAllNodes()).map(node => ({
    url: `https://library.stanford.edu${node.path === "/home" ? "/" : node.path}`,
    lastModified: new Date(node.changed.time),
    priority: node.__typename === "NodeStanfordPage" ? 1 : 0.8,
    changeFrequency: node.__typename === "NodeStanfordPage" ? "weekly" : "monthly",
  }))
}
export default Sitemap
