import {ParagraphRows} from "@/components/paragraph/rows/rows"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"

const StanfordPage = async ({node}: {node: NodeStanfordPage}) => {
  const fullWidth = node.layoutSelection?.id === "stanford_basic_page_full"

  const lastUpdated = new Date(node.changed.time as string).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })

  return (
    <article>
      {node.suPageComponents && <ParagraphRows items={node.suPageComponents} fullWidth={fullWidth} />}
      <div className="rs-py-4 centered">Last updated {lastUpdated}</div>
    </article>
  )
}

export default StanfordPage
