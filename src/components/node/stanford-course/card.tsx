import Link from "@/components/patterns/elements/drupal-link";
import {NodeStanfordCourse} from "@/lib/gql/__generated__/drupal";


interface Props {
  node: NodeStanfordCourse
  h3Heading?: boolean
}

const StanfordCourseCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';
  return (
    <article
      className="block w-full basefont-23 leading-display bg-white text-black border border-solid border-black-10 shadow-md rs-pt-2 rs-px-2 rs-pb-3" {...props}>
      <div className="rs-pb-0">
        <span className="font-bold leading-cozy">
          {node.suCourseSubject?.name}
          {node.suCourseCode}

          {(node.suCourseAcademicYear) &&
            <span className="font-normal">
              {' | '}{node.suCourseAcademicYear}
            </span>
          }
        </span>
      </div>
      <Link
        href={node.path}
        className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red"
      >
        <HeadingElement className="type-2">{node.title}</HeadingElement>
      </Link>
    </article>
  )
}

export default StanfordCourseCard;