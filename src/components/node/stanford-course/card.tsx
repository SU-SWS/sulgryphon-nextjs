import Conditional from "@/components/utils/conditional";
import Link from "@/components/patterns/elements/drupal-link";
import {Course} from "@/lib/drupal/drupal";
import {PropsWithoutRef} from "react";

interface Props {
  node: Course
  h3Heading?: boolean
}

const StanfordCourseCard = ({node, h3Heading, ...props}: PropsWithoutRef<Props>) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';
  return (
    <article
      className="block w-full basefont-23 leading-display bg-white text-black border border-solid border-black-10 shadow-md rs-pt-2 rs-px-2 rs-pb-3" {...props}>
      <div className="rs-pb-0">
        <span className="font-bold leading-cozy">
          <Conditional showWhen={node.su_course_subject?.name}>
            {node.su_course_subject?.name}{' '}
          </Conditional>
          <Conditional showWhen={node.su_course_code}>
            {node.su_course_code}
          </Conditional>
          <Conditional showWhen={node.su_course_academic_year}>
            <span className="font-normal">
              {' | '}{node.su_course_academic_year}
            </span>
          </Conditional>
        </span>
      </div>
      <Link
        href={node.path?.alias ?? "#"}
        className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red"
      >
        <HeadingElement className="type-2">{node.title}</HeadingElement>
      </Link>
    </article>
  )
}

export default StanfordCourseCard;