import Link from "@/components/patterns/elements/drupal-link";
import {Library} from "@/lib/drupal/drupal";

const SulLibraryCard = ({node, ...props}: {node: Library}) => {
  return (
    <article className="shadow-lg" {...props}>
      <Link href={node.path?.alias ?? "#"}
                  className="no-underline text-cardinal-red hover:underline hover:text-black">
        <h2 className="text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}
export default SulLibraryCard;