import Link from "@/components/patterns/elements/drupal-link";
import formatHtml from "@/lib/format-html";
import {NodeStanfordCourse} from "@/lib/gql/__generated__/drupal.d";

const StanfordCourseListItem = ({node, ...props}: { node: NodeStanfordCourse }) => {
  return (
    <article {...props}>
      <span className="font-bold leading-cozy">

          {node.suCourseSubject?.name}
          {node.suCourseCode}

        {(node.suCourseAcademicYear) &&
          <span className="font-normal" >
            {' | '}{node.suCourseAcademicYear}
          </span>
        }
      </span>
      <Link href={node.path} className="text-digital-red hocus:text-digital-red no-underline hocus:underline">
        <h2 className="type-2">{node.title}</h2>
      </Link>
      {(node.suCourseInstructors) &&
        <div className="mb-20 sm:flex">
          <h3 className="mb-0 font-bold leading-snug mr-[10px] text-16 xl:text-18 2xl:text-19">Instructors: </h3>
          {node.suCourseInstructors?.map((instructor, index) =>
            <span key={`course-instructor-${index}`} className="leading-cozy text-16 xl:text-18 2xl:text-19 font-normal">{(index ? ', ' : '') + instructor}</span>
          )}
        </div>
      }
      { node.body?.processed && <>{formatHtml(node.body.processed)}</>}
    </article>
  )
}
export default StanfordCourseListItem;