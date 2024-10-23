import {ParagraphRows} from "@/components/paragraph/rows/rows"
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"

const StanfordPage = async ({node, ...props}: {node: NodeStanfordPage}) => {
  const fullWidth = node.layoutSelection?.id === "stanford_basic_page_full"

  const lastUpdated = new Date(node.changed.time as string).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })

  return (
    <div {...props}>
      {node.suPageComponents && <ParagraphRows items={node.suPageComponents} fullWidth={fullWidth} />}
      <div className="rs-py-4 centered">Last updated {lastUpdated}</div>
    </div>
  )
}

export default StanfordPage
