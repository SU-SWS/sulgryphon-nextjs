import Link from "next/link";
import Card from "../../patterns/card";
import Conditional from "../../utils/conditional";
import {EventSeries} from "../../../../src/types/drupal";

const StanfordEventSeriesCard = ({node, ...props}: { node: EventSeries }) => {
  return (
    <article {...props}>
      <Card
        header={
          <Link className="su-text-black hocus:su-underline hocus:su-text-digital-red" href={node.path.alias}>
            {node.title}
          </Link>
        }
        footer={
          <Conditional showWhen={node.su_event_series_subheadline}>
              <span className="su-text-black">
                {node.su_event_series_subheadline}
              </span>
          </Conditional>
        }
      />
    </article>
  )
}
export default StanfordEventSeriesCard;