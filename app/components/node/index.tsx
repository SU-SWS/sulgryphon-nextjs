import dynamic from 'next/dynamic'

const StanfordCourse = dynamic(() => import("./stanford-course/page-display"));
const StanfordCourseCard = dynamic(() => import("./stanford-course/page-display"));
const StanfordCourseListItem = dynamic(() => import("./stanford-course/page-display"));

const StanfordEvent = dynamic(() => import("./stanford-event/page-display"));
const StanfordEventCard = dynamic(() => import("./stanford-event/page-display"));
const StanfordEventListItem = dynamic(() => import("./stanford-event/page-display"));

const StanfordEventSeries = dynamic(() => import("./stanford-event-series/page-display"));
const StanfordEventSeriesCard = dynamic(() => import("./stanford-event-series/page-display"));
const StanfordEventSeriesListItem = dynamic(() => import("./stanford-event-series/page-display"));

const StanfordNews = dynamic(() => import("./stanford-news/page-display"));
const StanfordNewsCard = dynamic(() => import("./stanford-news/page-display"));
const StanfordNewsListItem = dynamic(() => import("./stanford-news/page-display"));

const StanfordPage = dynamic(() => import("./stanford-page/page-display"));
const StanfordPageCard = dynamic(() => import("./stanford-page/page-display"));
const StanfordPageListItem = dynamic(() => import("./stanford-page/page-display"));

const StanfordPerson = dynamic(() => import("./stanford-person/page-display"));
const StanfordPersonCard = dynamic(() => import("./stanford-person/page-display"));
const StanfordPersonListItem = dynamic(() => import("./stanford-person/page-display"));

const StanfordPublication = dynamic(() => import("./stanford-publication/page-display"));
const StanfordPublicationCard = dynamic(() => import("./stanford-publication/page-display"));
const StanfordPublicationListItem = dynamic(() => import("./stanford-publication/page-display"));

const SulLibrary = dynamic(() => import("./sul-library/page-display"));
const SulLibraryCard = dynamic(() => import("./sul-library/page-display"));
const SUlLibraryListItem = dynamic(() => import("./sul-library/page-display"));

const StudyPlace = dynamic(() => import("./sul-study-place/page-display"));
const StudyPlaceCard = dynamic(() => import("./sul-study-place/page-display"));
const StudyPlaceListItem = dynamic(() => import("./sul-study-place/page-display"));

interface NodeProps {
  node: any
}

export const NodePageDisplay = ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.type === "node--stanford_course" && <StanfordCourse node={node} {...props}/>}
      {node.type === "node--stanford_event" && <StanfordEvent node={node} {...props}/>}
      {node.type === "node--stanford_event_series" && <StanfordEventSeries node={node} {...props}/>}
      {node.type === "node--stanford_news" && <StanfordNews node={node} {...props}/>}
      {node.type === "node--stanford_page" && <StanfordPage node={node} {...props}/>}
      {node.type === "node--stanford_person" && <StanfordPerson node={node} {...props}/>}
      {node.type === "node--stanford_publication" && <StanfordPublication node={node} {...props}/>}
      {node.type === "node--sul_library" && <SulLibrary node={node} {...props}/>}
      {node.type === "node--sul_study_place" && <StudyPlace node={node} {...props}/>}
    </>
  )
}

export const NodeCardDisplay = ({node, ...props}: NodeProps) => {
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
      {node.type === "node--sul_study_place" && <StudyPlace node={node} {...props}/>}
    </>
  )
}

export const NodeListDisplay = ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.type === "node--stanford_course" && <StanfordCourseListItem node={node} {...props}/>}
      {node.type === "node--stanford_event" && <StanfordEventListItem node={node} {...props}/>}
      {node.type === "node--stanford_event_series" && <StanfordEventSeriesListItem node={node} {...props}/>}
      {node.type === "node--stanford_news" && <StanfordNewsListItem node={node} {...props}/>}
      {node.type === "node--stanford_page" && <StanfordPageListItem node={node} {...props}/>}
      {node.type === "node--stanford_person" && <StanfordPersonListItem node={node} {...props}/>}
      {node.type === "node--stanford_publication" && <StanfordPublicationListItem node={node} {...props}/>}
      {node.type === "node--sul_library" && <SUlLibraryListItem node={node} {...props}/>}
      {node.type === "node--sul_study_place" && <StudyPlaceListItem node={node} {...props}/>}
    </>
  )
}

export default NodePageDisplay;