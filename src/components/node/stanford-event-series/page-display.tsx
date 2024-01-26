import NodeListDisplay from "@/components/node/node-list-display";
import {NodeStanfordEventSeries} from "@/lib/gql/__generated__/drupal";
import Paragraph from "@/components/paragraph";

const StanfordEventSeries = async ({node, ...props}: { node: NodeStanfordEventSeries }) => {

  return (
    <article {...props}>
      {node.suEventSeriesSubheadline &&
        <h2 className="type-3 rs-mb-1">
          {node.suEventSeriesSubheadline}
        </h2>
      }
      {node.suEventSeriesDek &&
        <div className="rs-mb-4 text-16 md:text-21">
          {node.suEventSeriesDek}
        </div>
      }

      {node.suEventSeriesComponents &&
        <>
          {node.suEventSeriesComponents.map(paragraph =>
            <Paragraph key={paragraph.id} paragraph={paragraph}/>
          )}
        </>
      }

      {(node.suEventSeriesEvent) &&
        <div className={"md:centered rs-my-6 grid gap-xl"}>
          {node.suEventSeriesEvent.map(item =>
            <div key={item.id}
                 className={"pb-50 mb-50 last:pb-0 border-[#c6c6c6] last:border-none border-b"}>
              <NodeListDisplay node={item} key={item.id}/>
            </div>
          )}
        </div>
      }
    </article>
  )
}

export default StanfordEventSeries