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
    <MainContentLayout pageTitle={node.title}>
      <article {...props}>
        { console.log(node) }
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
      { console.log(node) }
      <span className="su-font-bold su-leading-cozy">
        <Conditional showWhen={node.su_course_subject.name}>
          {node.su_course_subject.name}{' '}
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
      <Link href={node.path.alias} className="su-text-digital-red hocus:su-text-digital-red su-no-underline hocus:su-underline">
        <h2 className="su-type-2">{node.title}</h2>
      </Link>
      <Conditional showWhen={node.su_course_instructors}>
        <div className="su-mb-20 sm:su-flex">
          <h3 className="su-mb-0 su-font-bold su-leading-snug su-mr-[10px] su-text-16 xl:su-text-18 2xl:su-text-19">Instructors: </h3>
          {node.su_course_instructors.map((instructor, index) =>
            <span key={`course-instructor-${index}`} className="su-leading-cozy su-text-16 xl:su-text-18 2xl:su-text-19 su-font-normal">{(index ? ', ' : '') + instructor}</span>
          )}
        </div>
      </Conditional>
      { node.body && <>{formatHtml(node.body.processed)}</>}
      {/* <Conditional showWhen={node.body}>
        <>{formatHtml(node.body.processed)}</>
      </Conditional> */}
    </article>
  )
}

export const NodeStanfordCourseCard = ({node, ...props}: CourseNodeProps) => {
  return (
    <article className="su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3" {...props}>
      <div className="su-rs-pb-0">
        <span className="su-font-bold su-leading-cozy">
          <Conditional showWhen={node.su_course_subject.name}>
            {node.su_course_subject.name}{' '}
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
      </div>
      <Link href={node.path.alias} className="su-text-digital-red hocus:su-text-digital-red su-no-underline hocus:su-underline">
        <h2 className="su-type-2">{node.title}</h2>
      </Link>
    </article>
  )
}