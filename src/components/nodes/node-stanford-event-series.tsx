import {EventSeries} from "../../types/drupal";
import {Paragraph} from "@/components/paragraphs";
import Link from "next/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {NodeListDisplay} from "@/nodes/index";
import {Card} from "@/components/patterns/card";
import Conditional from "@/components/simple/conditional";
import {OneColumn} from "@/components/layouts/one-column";

interface EventSeriesNodeProps {
  node: EventSeries
}

export const NodeStanfordEventSeries = ({node, ...props}: EventSeriesNodeProps) => {
  return (
    <MainContentLayout pageTitle={node.title}>
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

        <Conditional showWhen={node.su_event_series_components}>
          <OneColumn items={node.su_event_series_components}/>
        </Conditional>

        <Conditional showWhen={node.su_event_series_event}>
          <div className={"md:su-cc su-rs-my-6 su-grid su-gap-xl"}>
            {node.su_event_series_event.map(item =>
              <div key={item.id} className={"su-pb-50 su-mb-50 last:su-pb-0 su-border-[#c6c6c6] last:su-border-none su-border-b"}>
                <NodeListDisplay node={item} key={item.id}/>
              </div>
            )}
          </div>
        </Conditional>
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordEventSeriesListItem = ({node, ...props}: EventSeriesNodeProps) => {
  // Not being utilized anywhere currently
  return (
    <article {...props}>
      <Link href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}

export const NodeStanfordEventSeriesCard = ({node, ...props}: EventSeriesNodeProps) => {
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