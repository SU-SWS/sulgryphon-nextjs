"use client";

import dynamic from "next/dynamic";
import {ErrorBoundary} from "react-error-boundary";
import {PropsWithRef} from "react";

const StanfordCourseCard = dynamic(() => import("./stanford-course/card"));
const StanfordEventCard = dynamic(() => import("./stanford-event/card"));
const StanfordEventSeriesCard = dynamic(() => import("./stanford-event-series/card"));
const StanfordNewsCard = dynamic(() => import("./stanford-news/card"));
const StanfordPageCard = dynamic(() => import("./stanford-page/card"));
const StanfordPersonCard = dynamic(() => import("./stanford-person/card"));
const StanfordPublicationCard = dynamic(() => import("./stanford-publication/card"));
const SulLibraryCard = dynamic(() => import("./sul-library/card"));
const SulStudyPlaceCard = dynamic(() => import("./sul-study-place/card"));

interface NodeProps extends PropsWithRef<any>{
  node: any
}

const NodeCardDisplay = ({node, ...props}: NodeProps) => {
  return (
    <ErrorBoundary
      fallback={<div>We are sorry. An error occurred while trying to display this content.</div>}
      onError={e => console.error(e.message)}
    >
      {node.type === "node--stanford_course" && <StanfordCourseCard node={node} {...props}/>}
      {node.type === "node--stanford_event" && <StanfordEventCard node={node} {...props}/>}
      {node.type === "node--stanford_event_series" && <StanfordEventSeriesCard node={node} {...props}/>}
      {node.type === "node--stanford_news" && <StanfordNewsCard node={node} {...props}/>}
      {node.type === "node--stanford_page" && <StanfordPageCard node={node} {...props}/>}
      {node.type === "node--stanford_person" && <StanfordPersonCard node={node} {...props}/>}
      {node.type === "node--stanford_publication" && <StanfordPublicationCard node={node} {...props}/>}
      {node.type === "node--sul_library" && <SulLibraryCard node={node} {...props}/>}
      {node.type === "node--sul_study_place" && <SulStudyPlaceCard node={node} {...props}/>}
    </ErrorBoundary>
  )
}

export default NodeCardDisplay;