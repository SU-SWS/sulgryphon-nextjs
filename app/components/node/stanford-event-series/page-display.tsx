import Conditional from "../../utils/conditional";
import {ParagraphRows} from "../../paragraph/rows/rows";
import {NodeListDisplay} from "../index";
import {Event, EventSeries} from "@/lib/drupal/drupal";
import {getResource} from "@/lib/drupal/get-resource";

export const StanfordEventSeries = ({node, ...props}: { node: Event }) => {
  // @ts-ignore
  return <EventSeriesPageDisplay node={node} {...props}/>
}

const EventSeriesPageDisplay = async ({node, ...props}: { node: EventSeries }) => {
  const requests: PromiseLike<any>[] = [];
  node.su_event_series_components.map(component => requests.push(getResource(component.type, component.id)));
  node.su_event_series_components = await Promise.all(requests);

  return (
    <article {...props}>
      <Conditional showWhen={node.su_event_series_subheadline}>
        <h2 className="su-type-3 su-rs-mb-1">
          {node.su_event_series_subheadline}
        </h2>
      </Conditional>
      <Conditional showWhen={node.su_event_series_dek}>
        <div className="su-rs-mb-4 su-text-16 md:su-text-21">
          {node.su_event_series_dek}
        </div>
      </Conditional>

      <ParagraphRows items={node.su_event_series_components}/>

      <Conditional showWhen={node.su_event_series_event}>
        <div className={"md:su-cc su-rs-my-6 su-grid su-gap-xl"}>
          {node.su_event_series_event.map(item =>
            <div key={item.id}
                 className={"su-pb-50 su-mb-50 last:su-pb-0 su-border-[#c6c6c6] last:su-border-none su-border-b"}>
              <NodeListDisplay node={item} key={item.id}/>
            </div>
          )}
        </div>
      </Conditional>
    </article>
  )
}

export default StanfordEventSeries