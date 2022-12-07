import {DrupalLink} from "@/components/simple/link";
import Link from "next/link";
import formatHtml from "@/lib/format-html";
import {Course} from "../../types/drupal";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import Conditional from "@/components/simple/conditional";

interface CourseNodeProps {
  node: Course;
}

export const NodeStanfordCourse = ({node, ...props}: CourseNodeProps) => {

  return (
    <MainContentLayout>
      <article>
        <h1>{node.title}</h1>
        <Conditional showWhen={node.su_course_academic_year}>
          {node.su_course_academic_year}
        </Conditional>
        <Conditional showWhen={node.body}>
          <>{formatHtml(node.body.processed)}</>
        </Conditional>
        <Conditional showWhen={node.su_course_code}>
          {node.su_course_code}
        </Conditional>
        <Conditional showWhen={node.su_course_id}>
          {node.su_course_id}
        </Conditional>
        {node.su_course_link && <DrupalLink href={node.su_course_link.url}>{node.su_course_link.title}</DrupalLink>}
        {/* <Conditional showWhen={node.su_course_link}>
          <DrupalLink href={node.su_course_link.url}>{node.su_course_link.title}</DrupalLink>
        </Conditional> */}
        <Conditional showWhen={node.su_course_quarters}>
          {node.su_course_quarters.map(term =>
            <div key={term.id}>{term.name}</div>
          )}
        </Conditional>
        <Conditional showWhen={node.su_course_subject}>
          <div>{node.su_course_subject.name}</div>
        </Conditional>
        <Conditional showWhen={node.su_course_tags}>
          {node.su_course_tags.map(term => <div key={term.id}>{term.name}</div>)}
        </Conditional>
        <Conditional showWhen={node.su_course_instructors}>
          {node.su_course_instructors.map((instructor, index) => <div
            key={`course-instructor-${index}`}>{instructor}</div>)}
        </Conditional>
        <Conditional showWhen={node.su_shared_tags}>
          {node.su_shared_tags.map(term => <div key={term.id}>{term.name}</div>)}
        </Conditional>
        <Conditional showWhen={node.su_course_section_units}>
          {node.su_course_section_units}
        </Conditional>
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordCourseListItem = ({node, ...props}: CourseNodeProps) => {
  return (
    <article {...props}>
      <Link href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}

export const NodeStanfordCourseCard = ({node, ...props}: CourseNodeProps) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <Link href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}