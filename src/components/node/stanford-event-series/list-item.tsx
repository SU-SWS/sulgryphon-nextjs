import Link from "@/components/patterns/elements/drupal-link";
import {EventSeries} from "@/lib/drupal/drupal";

const StanfordEventSeriesListItem = ({node, ...props}: { node: EventSeries }) => {
  // Not being utilized anywhere currently
  return (
    <article {...props}>
      <Link href={node.path?.alias ?? "#"}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}
export default StanfordEventSeriesListItem;