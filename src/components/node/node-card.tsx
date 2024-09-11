import {PropsWithRef} from "react"
import StanfordCourseCard from "@/components/node/stanford-course/card"
import StanfordEventCard from "@/components/node/stanford-event/card"
import StanfordEventSeriesCard from "@/components/node/stanford-event-series/card"
import StanfordNewsCard from "@/components/node/stanford-news/card"
import StanfordPageCard from "@/components/node/stanford-page/card"
import StanfordPersonCard from "@/components/node/stanford-person/card"
import StanfordPublicationCard from "@/components/node/stanford-publication/card"
import SulLibraryCard from "@/components/node/sul-library/card"
import SulStudyPlaceCard from "@/components/node/sul-study-place/card"
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d"

interface NodeProps extends PropsWithRef<any> {
  node: NodeUnion
}

const NodeCardDisplay = ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.__typename === "NodeStanfordCourse" && <StanfordCourseCard node={node} {...props} />}
      {node.__typename === "NodeStanfordEvent" && <StanfordEventCard node={node} {...props} />}
      {node.__typename === "NodeStanfordEventSeries" && <StanfordEventSeriesCard node={node} {...props} />}
      {node.__typename === "NodeStanfordNews" && <StanfordNewsCard node={node} {...props} />}
      {node.__typename === "NodeStanfordPage" && <StanfordPageCard node={node} {...props} />}
      {node.__typename === "NodeStanfordPerson" && <StanfordPersonCard node={node} {...props} />}
      {node.__typename === "NodeStanfordPublication" && <StanfordPublicationCard node={node} {...props} />}
      {node.__typename === "NodeSulLibrary" && <SulLibraryCard node={node} {...props} />}
      {node.__typename === "NodeSulStudyPlace" && <SulStudyPlaceCard node={node} {...props} />}
    </>
  )
}

export default NodeCardDisplay
