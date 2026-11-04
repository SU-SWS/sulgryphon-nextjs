import Link from "@/components/patterns/elements/drupal-link"
import formatHtml from "@/lib/format-html"
import {NodeStanfordCourse} from "@/lib/gql/__generated__/graphql"

const StanfordCourseListItem = ({node, ...props}: {node: NodeStanfordCourse}) => {
  return (
    <article {...props}>
      <span className="leading-cozy font-bold">
        {node.suCourseSubject?.name}
        {node.suCourseCode}

        {node.suCourseAcademicYear && (
          <span className="font-normal">
            {" | "}
            {node.suCourseAcademicYear}
          </span>
        )}
      </span>
      <Link href={node.path || "#"} className="text-digital-red no-underline hocus:text-digital-red hocus:underline">
        <h2 className="type-2">{node.title}</h2>
      </Link>
      {node.suCourseInstructors && (
        <div className="mb-20 sm:flex">
          <h3 className="mr-[10px] mb-0 text-16 leading-snug font-bold xl:text-18 2xl:text-19">Instructors: </h3>
          {node.suCourseInstructors?.map((instructor, index) => (
            <span
              key={`course-instructor-${index}`}
              className="text-16 leading-cozy font-normal xl:text-18 2xl:text-19"
            >
              {(index ? ", " : "") + instructor}
            </span>
          ))}
        </div>
      )}
      {node.body?.processed && <>{formatHtml(node.body.processed)}</>}
    </article>
  )
}
export default StanfordCourseListItem
