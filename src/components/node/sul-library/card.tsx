import Link from "@/components/patterns/elements/drupal-link";
import {Library} from "@/lib/drupal/drupal";

const SulLibraryCard = ({node, ...props}: {node: Library}) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <Link href={node.path?.alias ?? "#"}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}
export default SulLibraryCard;