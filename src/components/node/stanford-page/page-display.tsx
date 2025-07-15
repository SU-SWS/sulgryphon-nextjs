import Rows from "@/components/paragraph/rows/rows"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"
import StanfordPageMetadata from "@/components/node/stanford-page/stanford-page-metadata"

const StanfordPage = async ({node, ...props}: {node: NodeStanfordPage}) => {
  const fullWidth = node.layoutSelection?.id === "stanford_basic_page_full"

  const lastUpdated = new Date(node.changed.time as string).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })

  return (
    <article {...props}>
      <StanfordPageMetadata node={node} />
      {node.suPageComponents && <Rows components={node.suPageComponents} fullWidth={fullWidth} />}
      <footer className="rs-py-4 centered">Last updated {lastUpdated}</footer>
    </article>
  )
}

export default StanfordPage
