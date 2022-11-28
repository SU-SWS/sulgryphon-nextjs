import {EventSeries} from "../../types/drupal";
import {Paragraph} from "@/components/paragraphs";
import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";

interface EventSeriesNodeProps {
  node: EventSeries
}

export const NodeStanfordEventSeries = ({node, ...props}: EventSeriesNodeProps) => {
  return (
    <MainContentLayout>
      <article {...props}>
        <h1>{node.title}</h1>
        {node.su_event_series_subheadline}
        {node.su_event_series_dek}
        {node.su_event_series_components && node.su_event_series_components.map(paragraph =>
          <Paragraph key={paragraph.id} paragraph={paragraph}/>
        )}
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
    <article className="su-shadow-lg" {...props}>
      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}