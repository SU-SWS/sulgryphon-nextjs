import "server-only";
import Conditional from "@/components/utils/conditional";
import formatHtml from "@/lib/format-html";
import {Course} from "@/lib/drupal/drupal";
import Link from "next/link";

const StanfordCourse = ({node, ...props}: { node: Course }) => {

  return (
    <article {...props}>
      <Conditional showWhen={node.su_course_academic_year}>
        {node.su_course_academic_year}
      </Conditional>
      <Conditional showWhen={node.body}>
        <>{formatHtml(node.body)}</>
      </Conditional>
      <Conditional showWhen={node.su_course_code}>
        {node.su_course_code}
      </Conditional>
      <Conditional showWhen={node.su_course_id}>
        {node.su_course_id}
      </Conditional>
      {node.su_course_link?.url &&
          <Link href={node.su_course_link.url}>{node.su_course_link?.title}</Link>
      }
      {/* <Conditional showWhen={node.su_course_link}>
          <DrupalLink href={node.su_course_link.url}>{node.su_course_link.title}</DrupalLink>
        </Conditional> */}
      <Conditional showWhen={node.su_course_quarters}>
        {node.su_course_quarters?.map(term =>
          <div key={term.id}>{term.name}</div>
        )}
      </Conditional>
      <Conditional showWhen={node.su_course_subject}>
        <div>{node.su_course_subject?.name}</div>
      </Conditional>
      <Conditional showWhen={node.su_course_tags?.length}>
        {node.su_course_tags?.map(term => <div key={term.id}>{term.name}</div>)}
      </Conditional>
      <Conditional showWhen={node.su_course_instructors?.length}>
        {node.su_course_instructors?.map((instructor, index) => <div
          key={`course-instructor-${index}`}>{instructor}</div>)}
      </Conditional>
      <Conditional showWhen={node.su_shared_tags?.length}>
        {node.su_shared_tags?.map(term => <div key={term.id}>{term.name}</div>)}
      </Conditional>
      <Conditional showWhen={node.su_course_section_units}>
        {node.su_course_section_units}
      </Conditional>
    </article>
  )
}

export default StanfordCourse;