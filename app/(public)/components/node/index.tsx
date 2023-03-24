import dynamic from 'next/dynamic'

const StanfordCourse = dynamic(() => import("./stanford-course/page-display"));
{/* @ts-expect-error Async Server Component */}
const StanfordEvent = dynamic( () => import("./stanford-event/page-display"));
{/* @ts-expect-error Async Server Component */}
const StanfordEventSeries = dynamic(() => import("./stanford-event-series/page-display"));
{/* @ts-expect-error Async Server Component */}
const StanfordNews = dynamic(() => import("./stanford-news/page-display"));
{/* @ts-expect-error Async Server Component */}
const StanfordPage = dynamic(() => import("./stanford-page/page-display"));
{/* @ts-expect-error Async Server Component */}
const StanfordPerson = dynamic(() => import("./stanford-person/page-display"));
{/* @ts-expect-error Async Server Component */}
const StanfordPublication = dynamic(() => import("./stanford-publication/page-display"));
{/* @ts-expect-error Async Server Component */}
const SulLibrary = dynamic(() => import("./sul-library/page-display"));
const StudyPlace = dynamic(() => import("./sul-study-place/page-display"));

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

export default NodePageDisplay;