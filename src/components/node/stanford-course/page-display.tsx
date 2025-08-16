import formatHtml from "@/lib/format-html"
import Link from "@/components/patterns/elements/drupal-link"
import {NodeStanfordCourse} from "@/lib/gql/__generated__/drupal.d"

const StanfordCourse = ({node, ...props}: {node: NodeStanfordCourse}) => {
  return (
    <div {...props}>
      {node.suCourseAcademicYear}
      {node.body?.processed && <>{formatHtml(node.body.processed)}</>}
      {node.suCourseCode}
      {node.suCourseId}

      {node.suCourseLink?.url && <Link href={node.suCourseLink.url}>{node.suCourseLink?.title}</Link>}

      {node.suCourseQuarters && (
        <>
          {node.suCourseQuarters?.map(term => (
            <div key={term.id}>{term.name}</div>
          ))}
        </>
      )}
      {node.suCourseSubject && <div>{node.suCourseSubject?.name}</div>}
      {node.suCourseTags && (
        <div>
          {node.suCourseTags?.map(term => (
            <div key={term.id}>{term.name}</div>
          ))}
        </div>
      )}
      {node.suCourseInstructors && (
        <div>
          {node.suCourseInstructors?.map((instructor, index) => (
            <div key={`course-instructor-${index}`}>{instructor}</div>
          ))}
        </div>
      )}
      {node.suCourseSectionUnits}
    </div>
  )
}

export default StanfordCourse
