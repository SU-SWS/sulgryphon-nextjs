import {PropsWithRef} from "react";
import StanfordCourseCard from "@/components/node/stanford-course/card";
import StanfordEventCard from "@/components/node/stanford-event/card";
import StanfordEventSeriesCard from "@/components/node/stanford-event-series/card";
import StanfordNewsCard from "@/components/node/stanford-news/card";
import StanfordPageCard from "@/components/node/stanford-page/card";
import StanfordPersonCard from "@/components/node/stanford-person/card";
import StanfordPublicationCard from "@/components/node/stanford-publication/card";
import SulLibraryCard from "@/components/node/sul-library/card";
import SulStudyPlaceCard from "@/components/node/sul-study-place/card";

interface NodeProps extends PropsWithRef<any> {
  node: any
}

const NodeCardDisplay = ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.type === "node--stanford_course" && <StanfordCourseCard node={node} {...props}/>}
      {node.type === "node--stanford_event" && <StanfordEventCard node={node} {...props}/>}
      {node.type === "node--stanford_event_series" && <StanfordEventSeriesCard node={node} {...props}/>}
      {node.type === "node--stanford_news" && <StanfordNewsCard node={node} {...props}/>}
      {node.type === "node--stanford_page" && <StanfordPageCard node={node} {...props}/>}
      {node.type === "node--stanford_person" && <StanfordPersonCard node={node} {...props}/>}
      {node.type === "node--stanford_publication" && <StanfordPublicationCard node={node} {...props}/>}
      {node.type === "node--sul_library" && <SulLibraryCard node={node} {...props}/>}
      {node.type === "node--sul_study_place" && <SulStudyPlaceCard node={node} {...props}/>}
    </>
  )
}

export default NodeCardDisplay;