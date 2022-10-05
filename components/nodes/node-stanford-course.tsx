import {DrupalLink} from "@/components/simple/link";
import formatHtml from "@/lib/format-html";
import {Course} from "../../types/drupal";
import {MainContentLayout} from "@/components/layouts/main-content-layout";

interface CourseNodeProps {
  node: Course;
}

export const NodeStanfordCourse = ({node, ...props}: CourseNodeProps) => {

  return (
    <MainContentLayout>
      <article>
        <h1>{node.title}</h1>
        {node.su_course_academic_year}
        {node.body && <>{formatHtml(node.body.processed)}</>}
        {node.su_course_code}
        {node.su_course_id}
        {node.su_course_link && <DrupalLink href={node.su_course_link.url}>{node.su_course_link.title}</DrupalLink>}
        {node.su_course_quarters && node.su_course_quarters.map(term =>
          <div key={term.id}>{term.name}</div>
        )}
        {node.su_course_subject && <div>{node.su_course_subject.name}</div>}
        {node.su_course_tags && node.su_course_tags.map(term => <div key={term.id}>{term.name}</div>)}
        {node.su_course_instructors && node.su_course_instructors.map((instructor, index) => <div
          key={`course-instructor-${index}`}>{instructor}</div>)}
        {node.su_shared_tags && node.su_shared_tags.map(term => <div key={term.id}>{term.name}</div>)}
        {node.su_course_section_units}

      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordCourseListItem = ({node, ...props}: CourseNodeProps) => {
  return (
    <article {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

export const NodeStanfordCourseCard = ({node, ...props}: CourseNodeProps) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}