import Link from "@/components/patterns/elements/drupal-link"
import {NodeStanfordEventSeries} from "@/lib/gql/__generated__/drupal.d"

const StanfordEventSeriesListItem = ({node, ...props}: {node: NodeStanfordEventSeries}) => {
  // Not being utilized anywhere currently
  return (
    <article {...props}>
      <Link href={node.path || "#"}>
        <h2 className="text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}
export default StanfordEventSeriesListItem
