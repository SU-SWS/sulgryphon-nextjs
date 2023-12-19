import Conditional from "@/components/utils/conditional";
import Link from "@/components/patterns/elements/drupal-link";
import formatHtml from "@/lib/format-html";
import {Course} from "@/lib/drupal/drupal";

const StanfordCourseListItem = ({node, ...props}: { node: Course }) => {
  return (
    <article {...props}>
      <span className="font-bold leading-cozy">
        <Conditional showWhen={node.su_course_subject?.name}>
          {node.su_course_subject?.name}{' '}
        </Conditional>
        <Conditional showWhen={node.su_course_code}>
          {node.su_course_code}
        </Conditional>
        <Conditional showWhen={node.su_course_academic_year}>
          <span className="font-normal" >
            {' | '}{node.su_course_academic_year}
          </span>
        </Conditional>
      </span>
      <Link href={node.path?.alias ?? "#"} className="text-digital-red hocus:text-digital-red no-underline hocus:underline">
        <h2 className="type-2">{node.title}</h2>
      </Link>
      <Conditional showWhen={node.su_course_instructors}>
        <div className="mb-20 sm:flex">
          <h3 className="mb-0 font-bold leading-snug mr-[10px] text-16 xl:text-18 2xl:text-19">Instructors: </h3>
          {node.su_course_instructors?.map((instructor, index) =>
            <span key={`course-instructor-${index}`} className="leading-cozy text-16 xl:text-18 2xl:text-19 font-normal">{(index ? ', ' : '') + instructor}</span>
          )}
        </div>
      </Conditional>
      { node.body && <>{formatHtml(node.body)}</>}
    </article>
  )
}
export default StanfordCourseListItem;