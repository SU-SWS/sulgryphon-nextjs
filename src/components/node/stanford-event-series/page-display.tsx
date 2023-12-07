import "server-only";
import Conditional from "@/components/utils/conditional";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import NodeListDisplay from "@/components/node/node-list-display";
import {EventSeries} from "@/lib/drupal/drupal";
import fetchComponents from "@/lib/fetch-components";
import {DrupalParagraph} from "next-drupal";

const StanfordEventSeries = async ({node, ...props}: { node: EventSeries }) => {
  node.su_event_series_components = await fetchComponents(node.su_event_series_components ?? []) as DrupalParagraph[];
  node.su_event_series_components = node.su_event_series_components.filter(item => item?.id?.length > 0);
  return (
    <article {...props}>
      <Conditional showWhen={node.su_event_series_subheadline}>
        <h2 className="type-3 rs-mb-1">
          {node.su_event_series_subheadline}
        </h2>
      </Conditional>
      <Conditional showWhen={node.su_event_series_dek}>
        <div className="rs-mb-4 text-16 md:text-21">
          {node.su_event_series_dek}
        </div>
      </Conditional>

      <ParagraphRows items={node.su_event_series_components}/>

      <Conditional showWhen={node.su_event_series_event}>
        <div className={"md:centered rs-my-6 grid gap-xl"}>
          {node.su_event_series_event.map(item =>
            <div key={item.id}
                 className={"pb-50 mb-50 last:pb-0 border-[#c6c6c6] last:border-none border-b"}>
              <NodeListDisplay node={item} key={item.id}/>
            </div>
          )}
        </div>
      </Conditional>
    </article>
  )
}

export default StanfordEventSeries