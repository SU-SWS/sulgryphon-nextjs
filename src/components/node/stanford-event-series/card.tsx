import Link from "@/components/patterns/elements/drupal-link"
import Card from "@/components/patterns/card"
import {NodeStanfordEventSeries} from "@/lib/gql/__generated__/drupal.d"

const StanfordEventSeriesCard = ({node, ...props}: {node: NodeStanfordEventSeries}) => {
  return (
    <article {...props}>
      <Card
        header={
          <Link
            className="text-black underline active:text-digital-red active:no-underline hocus:text-brick-dark hocus:no-underline"
            href={node.path || "#"}
          >
            {node.title}
          </Link>
        }
        footer={<span className="text-black">{node.suEventSeriesSubheadline}</span>}
      />
    </article>
  )
}
export default StanfordEventSeriesCard
