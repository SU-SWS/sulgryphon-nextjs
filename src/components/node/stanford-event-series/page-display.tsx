import NodeListDisplay from "@/components/node/node-list-display"
import {NodeStanfordEventSeries} from "@/lib/gql/__generated__/drupal.d"
import Paragraph from "@/components/paragraph"

const StanfordEventSeries = async ({node, ...props}: {node: NodeStanfordEventSeries}) => {
  return (
    <div {...props}>
      {node.suEventSeriesSubheadline && <h2 className="rs-mb-1 type-3">{node.suEventSeriesSubheadline}</h2>}
      {node.suEventSeriesDek && <div className="rs-mb-4 text-22 leading">{node.suEventSeriesDek}</div>}

      {node.suEventSeriesComponents && (
        <>
          {node.suEventSeriesComponents.map(paragraph => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))}
        </>
      )}

      {node.suEventSeriesEvent && (
        <div className={"rs-my-6 grid gap-xl md:centered"}>
          {node.suEventSeriesEvent.map(item => (
            <div key={item.id} className={"mb-50 border-b border-[#c6c6c6] pb-50 last:border-none last:pb-0"}>
              <NodeListDisplay node={item} key={item.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StanfordEventSeries
