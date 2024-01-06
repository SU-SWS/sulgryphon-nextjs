import Link from "@/components/patterns/elements/drupal-link";
import Card from "@/components/patterns/card";
import Conditional from "@/components/utils/conditional";
import {EventSeries} from "@/lib/drupal/drupal";

const StanfordEventSeriesCard = ({node, ...props}: { node: EventSeries }) => {
  return (
    <article {...props}>
      <Card
        header={
          <Link
            className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red"
            href={node.path?.alias ?? "#"}>
            {node.title}
          </Link>
        }
        footer={
          <Conditional showWhen={node.su_event_series_subheadline}>
              <span className="text-black">
                {node.su_event_series_subheadline}
              </span>
          </Conditional>
        }
      />
    </article>
  )
}
export default StanfordEventSeriesCard;