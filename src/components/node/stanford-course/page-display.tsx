import formatHtml from "@/lib/format-html"
import Link from "@/components/patterns/elements/drupal-link"
import {NodeStanfordCourse} from "@/lib/gql/__generated__/drupal.d"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import NodePageMetadata from "@/components/node/node-page-metadata"
import {getCleanDescription} from "@/lib/text-tools"

const StanfordCourse = ({node, ...props}: {node: NodeStanfordCourse}) => {
  return (
    <article {...props} aria-labelledby={node.uuid}>
      <NodePageMetadata
        pageTitle={node.title}
        metatags={node.metatag}
        url={node.path || undefined}
        backupDescription={getCleanDescription(node.body?.processed)}
      />
      <InternalHeaderBanner>
        <h1
          id={node.uuid}
          className="relative mx-auto mb-10 mt-75 flex w-full max-w-[calc(100vw-10rem)] flex-row gap-20 p-0 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]"
        >
          {node.title}
        </h1>
      </InternalHeaderBanner>
      {node.suCourseAcademicYear}
      {node.body?.processed && <>{formatHtml(node.body.processed)}</>}
      {node.suCourseCode}
      {node.suCourseId}

      {node.suCourseLink?.url && <Link href={node.suCourseLink.url}>{node.suCourseLink?.title}</Link>}

      {node.suCourseQuarters && (
        <>
          {node.suCourseQuarters?.map(term => (
            <div key={term.uuid}>{term.name}</div>
          ))}
        </>
      )}
      {node.suCourseSubject && <div>{node.suCourseSubject?.name}</div>}
      {node.suCourseTags && (
        <div>
          {node.suCourseTags?.map(term => (
            <div key={term.uuid}>{term.name}</div>
          ))}
        </div>
      )}
      {node.suCourseInstructors && (
        <div>
          {node.suCourseInstructors?.map((instructor, index) => (
            <div key={`course-instructor-${index}`}>{instructor}</div>
          ))}
        </div>
      )}
      {node.suCourseSectionUnits}
    </article>
  )
}

export default StanfordCourse
