"use client";

import dynamic from 'next/dynamic'
import {ErrorBoundary} from "react-error-boundary";

const StanfordCourseListItem = dynamic(() => import("./stanford-course/list-item"));
const StanfordEventListItem = dynamic(() => import("./stanford-event/list-item"));
const StanfordEventSeriesListItem = dynamic(() => import("./stanford-event-series/list-item"));
const StanfordNewsListItem = dynamic(() => import("./stanford-news/list-item"));
const StanfordPageListItem = dynamic(() => import("./stanford-page/list-item"));
const StanfordPersonListItem = dynamic(() => import("./stanford-person/list-item"));
const StanfordPublicationListItem = dynamic(() => import("./stanford-publication/list-item"));
const SulLibraryListItem = dynamic(() => import("./sul-library/list-item"));
const StudyPlaceListItem = dynamic(() => import("./sul-study-place/list-item"));

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
      {node.type === "node--sul_study_place" && <StudyPlaceListItem node={node} {...props}/>}
    </ErrorBoundary>
  )
}

export default NodeListDisplay;