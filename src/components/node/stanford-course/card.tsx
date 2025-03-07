import Link from "@/components/patterns/elements/drupal-link"
import {NodeStanfordCourse} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  node: NodeStanfordCourse
  h3Heading?: boolean
}

const StanfordCourseCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"
  return (
    <article
      className="rs-pt-2 rs-px-2 rs-pb-3 block w-full border border-solid border-black-10 bg-white leading-display text-black shadow-md"
      {...props}
    >
      <div className="rs-pb-0">
        <span className="font-bold leading-cozy">
          {node.suCourseSubject?.name}
          {node.suCourseCode}

          {node.suCourseAcademicYear && (
            <span className="font-normal">
              {" | "}
              {node.suCourseAcademicYear}
            </span>
          )}
        </span>
      </div>
      <Link
        href={node.path || "#"}
        className="text-black underline active:text-digital-red active:no-underline hocus:text-brick-dark hocus:no-underline"
      >
        <HeadingElement className="type-1">{node.title}</HeadingElement>
      </Link>
    </article>
  )
}

export default StanfordCourseCard
