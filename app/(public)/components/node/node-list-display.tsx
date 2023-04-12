"use client";

import {ErrorBoundary} from "react-error-boundary";
import StanfordCourseListItem from "@/components/node/stanford-course/list-item";
import StanfordEventListItem from "@/components/node/stanford-event/list-item";
import StanfordEventSeriesListItem from "@/components/node/stanford-event-series/list-item";
import StanfordNewsListItem from "@/components/node/stanford-news/list-item";
import StanfordPageListItem from "@/components/node/stanford-page/list-item";
import StanfordPersonListItem from "@/components/node/stanford-person/list-item";
import StanfordPublicationListItem from "@/components/node/stanford-publication/list-item";
import SulLibraryListItem from "@/components/node/sul-library/list-item";
import SulStudyPlaceListItem from "@/components/node/sul-study-place/list-item";

interface NodeProps {
  node: any
}
const NodeListDisplay = ({node, ...props}: NodeProps) => {
  return (
    <ErrorBoundary
      fallback={<div>We are sorry. An error occurred while trying to display this content.</div>}
      onError={e => console.error(e.message)}
    >
      {node.type === "node--stanford_course" && <StanfordCourseListItem node={node} {...props}/>}
      {node.type === "node--stanford_event" && <StanfordEventListItem node={node} {...props}/>}
      {node.type === "node--stanford_event_series" && <StanfordEventSeriesListItem node={node} {...props}/>}
      {node.type === "node--stanford_news" && <StanfordNewsListItem node={node} {...props}/>}
      {node.type === "node--stanford_page" && <StanfordPageListItem node={node} {...props}/>}
      {node.type === "node--stanford_person" && <StanfordPersonListItem node={node} {...props}/>}
      {node.type === "node--stanford_publication" && <StanfordPublicationListItem node={node} {...props}/>}
      {node.type === "node--sul_library" && <SulLibraryListItem node={node} {...props}/>}
      {node.type === "node--sul_study_place" && <SulStudyPlaceListItem node={node} {...props}/>}
    </ErrorBoundary>
  )
}

export default NodeListDisplay;