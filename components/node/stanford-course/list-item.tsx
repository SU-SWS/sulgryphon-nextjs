import Conditional from "@/components/utils/conditional";
import Link from "next/link";
import formatHtml from "@/lib/format-html";
import {Course} from "@/lib/drupal/drupal";

const StanfordCourseListItem = ({node, ...props}: { node: Course }) => {
  return (
    <article {...props}>
      <span className="su-font-bold su-leading-cozy">
        <Conditional showWhen={node.su_course_subject?.name}>
          {node.su_course_subject?.name}{' '}
        </Conditional>
        <Conditional showWhen={node.su_course_code}>
          {node.su_course_code}
        </Conditional>
        <Conditional showWhen={node.su_course_academic_year}>
          <span className="su-font-normal" >
            {' | '}{node.su_course_academic_year}
          </span>
        </Conditional>
      </span>
      <Link href={node.path?.alias ?? "#"} className="su-text-digital-red hocus:su-text-digital-red su-no-underline hocus:su-underline">
        <h2 className="su-type-2">{node.title}</h2>
      </Link>
      <Conditional showWhen={node.su_course_instructors}>
        <div className="su-mb-20 sm:su-flex">
          <h3 className="su-mb-0 su-font-bold su-leading-snug su-mr-[10px] su-text-16 xl:su-text-18 2xl:su-text-19">Instructors: </h3>
          {node.su_course_instructors?.map((instructor, index) =>
            <span key={`course-instructor-${index}`} className="su-leading-cozy su-text-16 xl:su-text-18 2xl:su-text-19 su-font-normal">{(index ? ', ' : '') + instructor}</span>
          )}
        </div>
      </Conditional>
      { node.body && <>{formatHtml(node.body)}</>}
    </article>
  )
}
export default StanfordCourseListItem;