import StanfordCourse from "@/components/node/stanford-course/page-display";
import StanfordEvent from "@/components/node/stanford-event/page-display";
import StanfordEventSeries from "@/components/node/stanford-event-series/page-display";
import StanfordNews from "@/components/node/stanford-news/page-display";
import StanfordPage from "@/components/node/stanford-page/page-display";
import StanfordPerson from "@/components/node/stanford-person/page-display";
import StanfordPublication from "@/components/node/stanford-publication/page-display";
import SulLibrary from "@/components/node/sul-library/page-display";

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
    </>
  )
}

export default NodePageDisplay;