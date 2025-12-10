import NodeListDisplay from "@/components/node/node-list-display"
import {NodeStanfordEventSeries} from "@/lib/gql/__generated__/drupal.d"
import Paragraph from "@/components/paragraph"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import NodePageMetadata from "@/components/node/node-page-metadata"
import {getFirstText} from "@/lib/text-tools"

const StanfordEventSeries = async ({node, ...props}: {node: NodeStanfordEventSeries}) => {
  return (
    <article {...props} aria-labelledby={node.uuid}>
      <NodePageMetadata
        pageTitle={node.title}
        metatags={node.metatag}
        backupDescription={node.suEventSeriesSubheadline || getFirstText(node.suEventSeriesComponents)}
      />
      <InternalHeaderBanner>
        <h1
          id={node.uuid}
          className="relative mx-auto mb-10 mt-75 flex w-full max-w-[calc(100vw-10rem)] flex-row gap-20 p-0 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]"
        >
          {node.title}
        </h1>
      </InternalHeaderBanner>
      {node.suEventSeriesSubheadline && <h2 className="rs-mb-1 type-3">{node.suEventSeriesSubheadline}</h2>}
      {node.suEventSeriesDek && <div className="rs-mb-4 text-22 leading">{node.suEventSeriesDek}</div>}

      {node.suEventSeriesComponents && (
        <>
          {node.suEventSeriesComponents.map(paragraph => (
            <Paragraph key={paragraph.uuid} paragraph={paragraph} />
          ))}
        </>
      )}

      {node.suEventSeriesEvent && (
        <div className={"rs-my-6 grid gap-xl md:centered"}>
          {node.suEventSeriesEvent.map(item => (
            <div key={item.uuid} className={"mb-50 border-b border-[#c6c6c6] pb-50 last:border-none last:pb-0"}>
              <NodeListDisplay node={item} key={item.uuid} />
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

export default StanfordEventSeries
