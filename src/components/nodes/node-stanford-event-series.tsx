import {EventSeries} from "../../types/drupal";
import {Paragraph} from "@/components/paragraphs";
import {DrupalLink} from "@/components/simple/link";
import Link from "next/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {NodeListDisplay} from "@/nodes/index";
import {Card} from "@/components/patterns/card";
import Conditional from "@/components/simple/conditional";

interface EventSeriesNodeProps {
  node: EventSeries
}

export const NodeStanfordEventSeries = ({node, ...props}: EventSeriesNodeProps) => {
  return (
    <MainContentLayout pageTitle={node.title}>
      <article {...props}>
        <div>
          {node.su_event_series_subheadline}
        </div>
        <div>
          {node.su_event_series_dek}
        </div>
        <div>
          {node.su_event_series_components && node.su_event_series_components.map(paragraph =>
            <Paragraph key={paragraph.id} paragraph={paragraph}/>
          )}
        </div>
        {node.su_event_series_event && 
          <div className={"su-my-40 su-grid su-gap-xl"}>
            {node.su_event_series_event.map(item =>
            <div className={"su-pb-50 su-mb-50 last:su-pb-0 su-border-[#c6c6c6] last:su-border-none su-border-b"}>
              <NodeListDisplay node={item} key={item.id}/>
            </div>
            )}
          </div>
        }
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordEventSeriesListItem = ({node, ...props}: EventSeriesNodeProps) => {
  return (
    <article {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
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