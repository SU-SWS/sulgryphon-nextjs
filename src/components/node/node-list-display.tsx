import StanfordCourseListItem from "@/components/node/stanford-course/list-item";
import StanfordEventListItem from "@/components/node/stanford-event/list-item";
import StanfordEventSeriesListItem from "@/components/node/stanford-event-series/list-item";
import StanfordNewsListItem from "@/components/node/stanford-news/list-item";
import StanfordPageListItem from "@/components/node/stanford-page/list-item";
import StanfordPersonListItem from "@/components/node/stanford-person/list-item";
import StanfordPublicationListItem from "@/components/node/stanford-publication/list-item";
import SulLibraryListItem from "@/components/node/sul-library/list-item";
import SulStudyPlaceListItem from "@/components/node/sul-study-place/list-item";
import {NodeUnion} from "@/lib/gql/__generated__/drupal";

interface NodeProps {
  node: NodeUnion
}
const NodeListDisplay = ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.__typename === "NodeStanfordCourse" && <StanfordCourseListItem node={node} {...props}/>}
      {node.__typename === "NodeStanfordEvent" && <StanfordEventListItem node={node} {...props}/>}
      {node.__typename === "NodeStanfordEventSeries" && <StanfordEventSeriesListItem node={node} {...props}/>}
      {node.__typename === "NodeStanfordNews" && <StanfordNewsListItem node={node} {...props}/>}
      {node.__typename === "NodeStanfordPage" && <StanfordPageListItem node={node} {...props}/>}
      {node.__typename === "NodeStanfordPerson" && <StanfordPersonListItem node={node} {...props}/>}
      {node.__typename === "NodeStanfordPublication" && <StanfordPublicationListItem node={node} {...props}/>}
      {node.__typename === "NodeSulLibrary" && <SulLibraryListItem node={node} {...props}/>}
      {node.__typename === "NodeSulStudyPlace" && <SulStudyPlaceListItem node={node} {...props}/>}
    </>
  )
}

export default NodeListDisplay;