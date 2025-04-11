import StanfordCourse from "@/components/node/stanford-course/page-display"
import StanfordEvent from "@/components/node/stanford-event/page-display"
import StanfordEventSeries from "@/components/node/stanford-event-series/page-display"
import StanfordNews from "@/components/node/stanford-news/page-display"
import StanfordPage from "@/components/node/stanford-page/page-display"
import StanfordPerson from "@/components/node/stanford-person/page-display"
import StanfordPublication from "@/components/node/stanford-publication/page-display"
import SulLibrary from "@/components/node/sul-library/page-display"
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d"

interface NodeProps {
  node: NodeUnion
}

export const NodePageDisplay = ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.__typename === "NodeStanfordCourse" && <StanfordCourse node={node} {...props} />}
      {node.__typename === "NodeStanfordEvent" && <StanfordEvent node={node} {...props} />}
      {node.__typename === "NodeStanfordEventSeries" && <StanfordEventSeries node={node} {...props} />}
      {node.__typename === "NodeStanfordNews" && <StanfordNews node={node} {...props} />}
      {node.__typename === "NodeStanfordPage" && <StanfordPage node={node} {...props} />}
      {node.__typename === "NodeStanfordPerson" && <StanfordPerson node={node} {...props} />}
      {node.__typename === "NodeStanfordPublication" && <StanfordPublication node={node} {...props} />}
      {node.__typename === "NodeSulLibrary" && <SulLibrary node={node} {...props} />}
    </>
  )
}

export default NodePageDisplay
