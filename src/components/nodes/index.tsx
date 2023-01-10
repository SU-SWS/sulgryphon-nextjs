import dynamic from 'next/dynamic'

const NodeStanfordCourse = dynamic(() => import("./node-stanford-course").then((mod) => mod.NodeStanfordCourse));
const NodeStanfordCourseCard = dynamic(() => import("./node-stanford-course").then((mod) => mod.NodeStanfordCourseCard));
const NodeStanfordCourseListItem = dynamic(() => import("./node-stanford-course").then((mod) => mod.NodeStanfordCourseListItem));

const NodeStanfordEvent = dynamic(() => import("./node-stanford-event").then((mod) => mod.NodeStanfordEvent));
const NodeStanfordEventCard = dynamic(() => import("./node-stanford-event").then((mod) => mod.NodeStanfordEventCard));
const NodeStanfordEventListItem = dynamic(() => import("./node-stanford-event").then((mod) => mod.NodeStanfordEventListItem));

const NodeStanfordEventSeries = dynamic(() => import("./node-stanford-event-series").then((mod) => mod.NodeStanfordEventSeries));
const NodeStanfordEventSeriesCard = dynamic(() => import("./node-stanford-event-series").then((mod) => mod.NodeStanfordEventSeriesCard));
const NodeStanfordEventSeriesListItem = dynamic(() => import("./node-stanford-event-series").then((mod) => mod.NodeStanfordEventSeriesListItem));

const NodeStanfordNews = dynamic(() => import("./node-stanford-news").then((mod) => mod.NodeStanfordNews));
const NodeStanfordNewsCard = dynamic(() => import("./node-stanford-news").then((mod) => mod.NodeStanfordNewsCard));
const NodeStanfordNewsListItem = dynamic(() => import("./node-stanford-news").then((mod) => mod.NodeStanfordNewsListItem));

const NodeStanfordPage = dynamic(() => import("./node-stanford-page").then((mod) => mod.NodeStanfordPage));
const NodeStanfordPageCard = dynamic(() => import("./node-stanford-page").then((mod) => mod.NodeStanfordPageCard));
const NodeStanfordPageListItem = dynamic(() => import("./node-stanford-page").then((mod) => mod.NodeStanfordPageListItem));

const NodeStanfordPerson = dynamic(() => import("./node-stanford-person").then((mod) => mod.NodeStanfordPerson));
const NodeStanfordPersonCard = dynamic(() => import("./node-stanford-person").then((mod) => mod.NodeStanfordPersonCard));
const NodeStanfordPersonListItem = dynamic(() => import("./node-stanford-person").then((mod) => mod.NodeStanfordPersonListItem));

const NodeStanfordPublication = dynamic(() => import("./node-stanford-publication").then((mod) => mod.NodeStanfordPublication));
const NodeStanfordPublicationCard = dynamic(() => import("./node-stanford-publication").then((mod) => mod.NodeStanfordPublicationCard));
const NodeStanfordPublicationListItem = dynamic(() => import("./node-stanford-publication").then((mod) => mod.NodeStanfordPublicationListItem));

const NodeSulLibrary = dynamic(() => import("./node-sul-library").then((mod) => mod.NodeSulLibrary));
const NodeSulLibraryCard = dynamic(() => import("./node-sul-library").then((mod) => mod.NodeSulLibraryCard));
const NodeSUlLibraryListItem = dynamic(() => import("./node-sul-library").then((mod) => mod.NodeSUlLibraryListItem));

interface NodeProps {
  node: any
}

export const NodePageDisplay= ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.type === "node--stanford_course" && <NodeStanfordCourse node={node} {...props}/>}
      {node.type === "node--stanford_event" && <NodeStanfordEvent node={node} {...props}/>}
      {node.type === "node--stanford_event_series" && <NodeStanfordEventSeries node={node} {...props}/>}
      {node.type === "node--stanford_news" && <NodeStanfordNews node={node} {...props}/>}
      {node.type === "node--stanford_page" && <NodeStanfordPage node={node} {...props}/>}
      {node.type === "node--stanford_person" && <NodeStanfordPerson node={node} {...props}/>}
      {node.type === "node--stanford_publication" && <NodeStanfordPublication node={node} {...props}/>}
      {node.type === "node--sul_library" && <NodeSulLibrary node={node} {...props}/>}
    </>
  )
}

export const NodeCardDisplay = ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.type === "node--stanford_course" && <NodeStanfordCourseCard node={node} {...props}/>}
      {node.type === "node--stanford_event" && <NodeStanfordEventCard node={node} {...props}/>}
      {node.type === "node--stanford_event_series" && <NodeStanfordEventSeriesCard node={node} {...props}/>}
      {node.type === "node--stanford_news" && <NodeStanfordNewsCard node={node} {...props}/>}
      {node.type === "node--stanford_page" && <NodeStanfordPageCard node={node} {...props}/>}
      {node.type === "node--stanford_person" && <NodeStanfordPersonCard node={node} {...props}/>}
      {node.type === "node--stanford_publication" && <NodeStanfordPublicationCard node={node} {...props}/>}
      {node.type === "node--sul_library" && <NodeSulLibraryCard node={node} {...props}/>}
    </>
  )
}

export const NodeListDisplay = ({node, ...props}: NodeProps) => {
  return (
    <>
      {node.type === "node--stanford_course" && <NodeStanfordCourseListItem node={node} {...props}/>}
      {node.type === "node--stanford_event" && <NodeStanfordEventListItem node={node} {...props}/>}
      {node.type === "node--stanford_event_series" && <NodeStanfordEventSeriesListItem node={node} {...props}/>}
      {node.type === "node--stanford_news" && <NodeStanfordNewsListItem node={node} {...props}/>}
      {node.type === "node--stanford_page" && <NodeStanfordPageListItem node={node} {...props}/>}
      {node.type === "node--stanford_person" && <NodeStanfordPersonListItem node={node} {...props}/>}
      {node.type === "node--stanford_publication" && <NodeStanfordPublicationListItem node={node} {...props}/>}
      {node.type === "node--sul_library" && <NodeSUlLibraryListItem node={node} {...props}/>}
    </>
  )
}
