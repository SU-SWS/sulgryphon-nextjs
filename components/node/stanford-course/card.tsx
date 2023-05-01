import Conditional from "@/components/utils/conditional";
import Link from "next/link";
import {Course} from "@/lib/drupal/drupal";

const StanfordCourseCard = ({node, ...props}: { node: Course }) => {
  return (
    <article
      className="su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3" {...props}>
      <div className="su-rs-pb-0">
        <span className="su-font-bold su-leading-cozy">
          <Conditional showWhen={node.su_course_subject?.name}>
            {node.su_course_subject?.name}{' '}
          </Conditional>
          <Conditional showWhen={node.su_course_code}>
            {node.su_course_code}
          </Conditional>
          <Conditional showWhen={node.su_course_academic_year}>
            <span className="su-font-normal">
              {' | '}{node.su_course_academic_year}
            </span>
          </Conditional>
        </span>
      </div>
      <Link href={node.path.alias}
            className="su-underline hocus:su-no-underline active:su-no-underline su-text-black hocus:su-text-brick-dark active:su-text-digital-red">
        <h2 className="su-type-2">{node.title}</h2>
      </Link>
    </article>
  )
}

export default StanfordCourseCard;